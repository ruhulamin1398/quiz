const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the QUIZ
const quizSchema = new Schema(
    {
        lotteryType: {
            type: String,
            enum: ['general', 'foreign', 'test'],
            required: true,
        },
        round: {
            type: Number,
            required: true,
            min: 1,
        },
        entryFee: {
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
                    required: true,
                    min: 1,
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
                count: {
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
