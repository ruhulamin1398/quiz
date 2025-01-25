const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");
const Question = require('../models/question.model');
const UserQuizQuestion = require('../models/userQuizQuestion.model');
const Quiz = require('../models/quiz.model');


exports.enrollUser = asyncHandler(async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;
    await verifyPaymentData(); // verify payment data
    const userQuizQuestion = await assignUniqueQuestionToUser(userId, quizId);

    res.status(200).json({
        message: "Enroll user to quiz",
        quizId,
        userId,
        userQuizQuestion

    });
});



async function assignUniqueQuestionToUser(userId, quizId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Check if the user is already enrolled in the quiz
        const alreadyEnrolled = await UserQuizQuestion.find({ userId, quizId }).session(session);
        if (alreadyEnrolled.length > 0) {
            throw new Error('Already Enrolled');
        }

        // Fetch quiz details
        const quiz = await Quiz.findById(quizId).session(session);
        if (!quiz) {
            throw new Error('No quiz found with the provided ID.');
        }
        if (!quiz.status) {
            throw new Error('Quiz is not active.');
        }

        const existingQuestionTypes = quiz.questionTypes;

        // Prepare to collect all new assignments
        const newAssignments = [];

        for (let i = 0; i < existingQuestionTypes.length; i++) {
            const { count: numberOfQuestionsToAssign, type: questionType } = existingQuestionTypes[i];

            // Fetch all question IDs already assigned to the user for this quiz and type
            const assignedQuestions = await UserQuizQuestion.find({ userId, quizId, questionType })
                .select('questionId')
                .session(session);
            const assignedQuestionIds = assignedQuestions.map(q => q.questionId);

            // Fetch the required number of new questions
            const newQuestions = await Question.aggregate([
                { $match: { _id: { $nin: assignedQuestionIds }, type: questionType } }, // Exclude already assigned questions
                { $sample: { size: numberOfQuestionsToAssign } } // Randomly select the required number of questions
            ]).session(session);

            if (newQuestions.length < numberOfQuestionsToAssign) {
                throw new Error(`Not enough unique questions available for type: ${questionType}`);
            }

            // Collect new assignments
            newQuestions.forEach(question => {
                newAssignments.push({
                    userId,
                    quizId,
                    questionId: question._id,
                    questionType: question.type,
                });
            });
        }

        // Save all new assignments in bulk
        await UserQuizQuestion.insertMany(newAssignments, { session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Return the assigned questions
        return await UserQuizQuestion.find({ userId, quizId }).populate('questionId');
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Transaction failed:', error);
        throw error;
    }
}

exports.getUserQuestionsInQuiz = asyncHandler(async (userId, quizId) => {
    try {
        const userQuestions = await UserQuizQuestion.find({ userId, quizId })
            .populate('questionId') // Populate question details
            // .populate('quizId') // Optionally populate quiz details
            .exec();

        return userQuestions;
    } catch (error) {
        console.error(error);
        throw error;
    }
});



async function verifyPaymentData() {
    return true;
}

