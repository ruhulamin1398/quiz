const express = require("express");
const router = express.Router();
const { createQuizQuestionType, getAllQuizQuestionTypes, getQuizQuestionTypeById, updateQuizQuestionType, deleteQuizQuestionType } = require("../controllers/quizQuestionType.controller");

// Route to create a new quiz type
router.post("/", createQuizQuestionType);

// Route to get all quiz types
router.get("/", getAllQuizQuestionTypes);

// Route to get a single quiz type by ID
router.get("/:id", getQuizQuestionTypeById);

// Route to update a quiz type by ID
router.put("/:id", updateQuizQuestionType);
// Route to delete a quiz type by ID
router.delete("/:id", deleteQuizQuestionType);

module.exports = router;
