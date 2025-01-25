const mongoose = require("mongoose");

const quizQuestionTypeSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Quiz type is required"],
            unique: true,
            trim: true,
            unique: [true, "Already exists"],
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("QuizQuestionType", quizQuestionTypeSchema);
