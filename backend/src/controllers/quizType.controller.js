const asyncHandler = require("express-async-handler");
const QuizType = require("../models/quizType.model");

// @desc    Create a new quiz type
// @route   POST /api/v1/quiz-types
// @access  Public
exports.createQuizType = asyncHandler(async (req, res) => {
    const { type, description } = req.body;

    if (!type || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const existingQuizType = await QuizType.findOne({ type });

    if (existingQuizType) {
        res.status(400);
        throw new Error("Quiz type already exists");
    }

    const quizType = await QuizType.create({ type, description });

    if (quizType) {
        res.status(201).json({
            message: "Quiz type created successfully",
            quizType,
        });
    } else {
        res.status(500);
        throw new Error("Failed to create quiz type");
    }
});

// @desc    Get all quiz types
// @route   GET /api/v1/quiz-types
// @access  Public
exports.getAllQuizTypes = asyncHandler(async (req, res) => {
    const quizTypes = await QuizType.find();

    res.status(200).json({
        message: "Quiz types retrieved successfully",
        quizTypes,
    });
});


// @desc    Get a single quiz type by ID
// @route   GET /api/v1/quiz-types/:id
// @access  Public
exports.getQuizTypeById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quizType = await QuizType.findById(id);

    if (!quizType) {
        res.status(404);
        throw new Error("Quiz type not found");
    }

    res.status(200).json({
        message: "Quiz type retrieved successfully",
        quizType,
    });
});

// @desc    Update a quiz type by ID
// @route   PUT /api/v1/quiz-types/:id
// @access  Public

exports.updateQuizType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, description } = req.body;

    if (!type || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const quizType = await QuizType.findById(id);

    if (!quizType) {
        res.status(404);
        throw new Error("Quiz type not found");
    }

    quizType.type = type;
    quizType.description = description;

    const updatedQuizType = await quizType.save();

    res.status(200).json({
        message: "Quiz type updated successfully",
        quizType: updatedQuizType,
    });
});



// @desc    Delete a quiz type by ID
// @route   DELETE /api/v1/quiz-types/:id
// @access  Public
exports.deleteQuizType = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quizType = await QuizType.findById(id);

    if (!quizType) {
        res.status(404);
        throw new Error("Quiz type not found");
    }

    await quizType.deleteOne();

    res.status(200).json({
        message: "Quiz type deleted successfully",
    });
});


