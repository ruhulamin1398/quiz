const asyncHandler = require("express-async-handler");
const QuizQuestionType = require("../models/quizQuestionType.model");

// @desc    Create a new quiz type
// @route   POST /api/v1/quiz-types
// @access  Public
exports.createQuizQuestionType = asyncHandler(async (req, res) => {
    const { type, description } = req.body;

    if (!type || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const existingQuizQuestionType = await QuizQuestionType.findOne({ type });

    if (existingQuizQuestionType) {
        res.status(400);
        throw new Error("Quiz type already exists");
    }

    const quizType = await QuizQuestionType.create({ type, description });

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
exports.getAllQuizQuestionTypes = asyncHandler(async (req, res) => {
    const quizTypes = await QuizQuestionType.find();
    console.log(quizTypes);

    res.status(200).json({
        message: "Quiz types retrieved successfully",
        quizTypes,
    });
});


// @desc    Get a single quiz type by ID
// @route   GET /api/v1/quiz-types/:id
// @access  Public
exports.getQuizQuestionTypeById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quizType = await QuizQuestionType.findById(id);

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

exports.updateQuizQuestionType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, description } = req.body;

    if (!type || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const quizType = await QuizQuestionType.findById(id);

    if (!quizType) {
        res.status(404);
        throw new Error("Quiz type not found");
    }

    quizType.type = type;
    quizType.description = description;

    const updatedQuizQuestionType = await quizType.save();

    res.status(200).json({
        message: "Quiz type updated successfully",
        quizType: updatedQuizQuestionType,
    });
});



// @desc    Delete a quiz type by ID
// @route   DELETE /api/v1/quiz-types/:id
// @access  Public
exports.deleteQuizQuestionType = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quizType = await QuizQuestionType.findById(id);

    if (!quizType) {
        res.status(404);
        throw new Error("Quiz type not found");
    }

    await quizType.deleteOne();

    res.status(200).json({
        message: "Quiz type deleted successfully",
    });
});


