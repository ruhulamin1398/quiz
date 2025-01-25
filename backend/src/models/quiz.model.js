const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the QUIZ
const quizSchema = new Schema(
    {
        quizType: {
            type: String,
            enum: ['general', 'foreign', 'test'],
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        isEnrolled: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Number,
            required: true,
            min: 1,
        },
        entryFees: {
            type: Number,
            required: true,
            min: 1,
        },
        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },
        questionTypes: [
            {
                type: {
                    type: String,
                    required: true,
                },
                count: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        maxParticipants: {
            type: Number,
            required: true,
            min: 1,
        },
        prizes: [
            {
                label: {
                    type: String,
                    required: true,
                    min: 1,
                },
                total_person: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                amount: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
