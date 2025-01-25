const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userQuizQuestionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    round: {
        type: Number,
        required: true,
    }, answered: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true,
});

// Ensure uniqueness of userId, quizId, questionId combination
userQuizQuestionSchema.index({ userId: 1, quizId: 1, questionId: 1 }, { unique: true });

const UserQuizQuestion = mongoose.model('UserQuizQuestion', userQuizQuestionSchema);
module.exports = UserQuizQuestion;
