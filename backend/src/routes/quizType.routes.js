const express = require("express");
const router = express.Router();
const {
    createQuizType,
    getAllQuizTypes,
    deleteQuizType,
    updateQuizType,
    getQuizTypeById,
} = require("../controllers/quizType.controller");

// Route to create a new quiz type
router.post("/", createQuizType);

// Route to get all quiz types
router.get("/", getAllQuizTypes);

// Route to get a single quiz type by ID
router.get("/:id", getQuizTypeById);

// Route to update a quiz type by ID
router.put("/:id", updateQuizType);
// Route to delete a quiz type by ID
router.delete("/:id", deleteQuizType);

module.exports = router;
