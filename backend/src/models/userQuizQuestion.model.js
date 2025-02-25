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

    enrollmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    questionType: {
        type: String,
        required: true,
    },
    isAnswered: {
        type: Boolean,
        default: false,
    },
    isCorrect: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: true,
});


const UserQuizQuestion = mongoose.model('UserQuizQuestion', userQuizQuestionSchema);
module.exports = UserQuizQuestion;
