const express = require('express');
const router = express.Router();
const quizController = require("../controllers/quiz.controller");

// Route to create a new quiz
router.post('/', quizController.createQuiz);

// Route to get all quizzes
router.get('/', quizController.getQuizzes);

// Route to get a quiz by ID
router.get('/:id', quizController.getQuizById);

// Route to update a quiz
router.put('/:id', quizController.updateQuiz);

// Route to delete a quiz
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
