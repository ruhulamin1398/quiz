const express = require('express');
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const quizQuetionController = require("../controllers/quizQuestion.controller");
const validateToken = require('../middleware/validateTokenHandler');

// Route to create a new quiz
router.post('/', quizController.createQuiz);

// Route to get all quizzes
router.get('/', quizController.getQuizzes);

router.get('/inactive-quizzzes', quizController.getInactiveQuizzes);

router.get('/active-quizzzes', quizController.getActiveQuizzes);

// Route to get a quiz by ID
router.get('/:id', validateToken, quizController.getQuizById);

// Route to update a quiz
router.put('/:id', quizController.updateQuiz);

// Route to delete a quiz
router.delete('/:id', quizController.deleteQuiz);



// Route to create a new quiz
router.post('/enroll/:id', validateToken, quizQuetionController.enrollUser);

module.exports = router;
