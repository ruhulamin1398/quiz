const Question = require('../models/question.model');
const UserQuizQuestion = require('../models/userQuizQuestion.model');



exports.enrollUser = asyncHandler(async (req, res) => {

    res.status(200).json({
        message: "Quiz types retrieved successfully",
        quizTypes,
    });
});

async function assignUniqueQuestionToUser(userId, quizId, round) {
    try {
        // Fetch all question IDs already assigned to the user for this quiz
        const assignedQuestions = await UserQuizQuestion.find({ userId, quizId }).select('questionId');
        const assignedQuestionIds = assignedQuestions.map(q => q.questionId);

        // Find a new question that hasn't been assigned yet
        const newQuestion = await Question.findOne({
            _id: { $nin: assignedQuestionIds }, // Exclude already assigned questions
        });

        if (!newQuestion) {
            throw new Error('No unique questions available for this user in this quiz.');
        }

        // Save the new question assignment
        const userQuizQuestion = new UserQuizQuestion({
            userId,
            quizId,
            questionId: newQuestion._id,
            round,
        });
        await userQuizQuestion.save();

        return userQuizQuestion;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function getUserQuestionsInQuiz(userId, quizId) {
    try {
        const userQuestions = await UserQuizQuestion.find({ userId, quizId })
            .populate('questionId') // Populate question details
            .populate('quizId') // Optionally populate quiz details
            .exec();

        return userQuestions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

