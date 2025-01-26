
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
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

    earnedPoints: {
        type: Number,
        default: 0,
    },
    totalCorrectAnswer: {
        type: Number,
        default: 0,
    },
    totalWrongAnswer: {
        type: Number,
        default: 0,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isPassed: {
        type: Boolean,
        required: false,
    }
}, {
    timestamps: true,
});


const UserQuizQuestion = mongoose.model('Enrollment', enrollmentSchema);
module.exports = UserQuizQuestion;
