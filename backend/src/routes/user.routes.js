const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const validateToken = require("../middleware/validateTokenHandler");

// Define routes for questions
// router.get('/', questionController.getAllQuestions);
// router.get('/type/:type', questionController.getQuestionByType);
// router.get('/:id', questionController.getQuestionById);
router.post('/login', userController.loginOrRegisterUser);
router.post('/sponsor', validateToken, userController.updateSponsor);
// router.put('/:id', questionController.updateQuestion);
// router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
