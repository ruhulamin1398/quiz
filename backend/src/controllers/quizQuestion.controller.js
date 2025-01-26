const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");
const Question = require('../models/question.model');
const UserQuizQuestion = require('../models/userQuizQuestion.model');
const Quiz = require('../models/quiz.model');
const Enrollment = require('../models/enrollment.model');

exports.enrollUser = asyncHandler(async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;

    const existingEnrollment = await Enrollment.findOne({ userId, quizId, isCompleted: false }).exec();
    if (existingEnrollment) {
        return res.status(400).json({
            message: "Already Enrolled"
        });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new Error('No quiz found with the provided ID.');
    }
    if (!quiz.status) {
        throw new Error('Quiz is not active.');
    }



    await verifyPaymentData(); // verify payment data
    const enrollment = new Enrollment({ userId, quizId });
    await enrollment.save();


    // const enrollment = new Enrollment({ userId, quizId });
    const userQuizQuestion = await assignUniqueQuestionToUser(userId, quizId, enrollment._id);

    res.status(200).json({
        message: "Enroll user to quiz",
        enrollment

    });
});



exports.submitAnswer = asyncHandler(async (req, res) => {
    const enrollmentId = req.body.enrollmentId;
    const quizId = req.params.id;
    const userId = req.user.id;
    const isCompleted = req.body.isCompleted;
    const totalCorrectAnswer = req.body.totalCorrectAnswer;
    const totalWrongAnswer = req.body.totalWrongAnswer;
    const questionsToUpdate = req.body.questions;

    const enrollment = await Enrollment.findById(enrollmentId).exec();

    if (!enrollment) {
        res.status(404).json({
            message: "Enrollment not found",
        })
    }

    if (enrollment.isCompleted) {
        res.status(400).json({
            message: "already answered all question",
        })
    }



    if (isCompleted == true) {
        await Enrollment.findByIdAndUpdate(
            enrollmentId,
            { isCompleted: true, totalWrongAnswer: totalWrongAnswer, totalCorrectAnswer: totalCorrectAnswer },
            { new: true }
        );
    }

    await updateUserQuizQuestions(enrollmentId, questionsToUpdate);
    const userQuizQuestions = await UserQuizQuestion.find({ enrollmentId }).exec();

    const updatedEnrollment = await Enrollment.findById(enrollmentId).exec();
    res.status(200).json({
        message: "Sumitted answers are updated for quiz",
        quizId,
        userId,
        updatedEnrollment,
        userQuizQuestions

    });
});




const updateUserQuizQuestions = async (enrollmentId, questions) => {
    try {
        for (const question of questions) {
            await UserQuizQuestion.updateOne(
                { enrollmentId, _id: question._id, isAnswered: false }, // Find document with `isAnswered: false`
                {
                    $set: {
                        isAnswered: true,
                        isCorrect: question.isCorrect,
                    },
                }
            );
        }
        console.log("Questions updated successfully.");
    } catch (error) {
        console.error("Error updating questions:", error);
        throw error;
    }
};




async function assignUniqueQuestionToUser(userId, quizId, enrollmentId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Fetch quiz details

        const quiz = await Quiz.findById(quizId).session(session);
        const existingQuestionTypes = quiz.questionTypes;

        // Prepare to collect all new assignments
        const newAssignments = [];

        for (let i = 0; i < existingQuestionTypes.length; i++) {
            const { count: numberOfQuestionsToAssign, type: questionType } = existingQuestionTypes[i];

            // Fetch all question IDs already assigned to the user for this quiz and type
            const assignedQuestions = await UserQuizQuestion.find({ userId, enrollmentId, questionType })
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
                    enrollmentId,
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

exports.getUserQuestionsInQuiz = asyncHandler(async (userId, enrollmentId) => {
    try {
        const userQuestions = await UserQuizQuestion.find({ enrollmentId })
            .select('questionId answered')
            .populate({
                path: 'questionId',
                select: 'title options correctAnswer answered', // Select fields you need
            })
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

