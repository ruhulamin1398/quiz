const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

// Define routes for questions
router.get('/', questionController.getAllQuestions);
router.get('/type/:type', questionController.getQuestionByType);
router.get('/:id', questionController.getQuestionById);
router.post('/', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
