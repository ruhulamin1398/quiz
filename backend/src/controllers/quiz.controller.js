const Quiz = require('../models/quiz.model');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const quizData = req.body;

    // Validate the prizes array length
    if (quizData.prizes.length !== 5) {
      return res.status(400).json({
        message: 'The prizes array must have exactly 5 items.',
      });
    }

    // Get the latest round for the specified lotteryType
    const latestQuiz = await Quiz.findOne({ lotteryType: quizData.lotteryType })
      .sort({ round: -1 }) // Sort by round in descending order to get the latest
      .exec();

    // Set the round for the new quiz
    const nextRound = latestQuiz ? latestQuiz.round + 1 : 1;
    quizData.round = nextRound;

    // Create and save the new quiz
    const newQuiz = new Quiz(quizData);
    const savedQuiz = await newQuiz.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActiveQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ status: true }).sort({ round: 1 });

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInactiveQuizzes = async (req, res) => {
  try {
    // Get the page number from the query parameters; default to 1
    const { page = 1 } = req.query;

    // Convert page to a number and calculate the skip value
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    // Fetch inactive quizzes with pagination, sorted by the latest creation date
    const quizzes = await Quiz.find({ status: false })
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(skip)
      .limit(limit);

    // Get the total count of inactive quizzes for pagination info
    const totalInactiveQuizzes = await Quiz.countDocuments({ status: false });

    res.status(200).json({
      quizzes,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalInactiveQuizzes / limit),
      totalItems: totalInactiveQuizzes,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching inactive quizzes", error: error.message });
  }
};



// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
