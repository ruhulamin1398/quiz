const Question = require('../models/question.model');

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getQuestionByType = async (req, res) => {
  try {
    const { type } = req.params;


    const questions = await Question.find({ type });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { type, title, options, correctAnswer } = req.body;
    const question = new Question({ type, title, options, correctAnswer });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing question by ID
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const question = await Question.findByIdAndUpdate(id, updates, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
