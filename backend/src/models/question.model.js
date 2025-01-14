const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Question schema
const questionSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["general", "easy", "islamic", "global"] 
  },
  title: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} must have exactly 4 options']
  },
  correctAnswer: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4] // Only allow values from 1 to 4
  }
});

// Custom validator to ensure exactly 4 options
function arrayLimit(val) {
  return val.length === 4;
}

// Create the model from the schema and export it
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;