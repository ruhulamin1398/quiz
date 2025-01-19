require("dotenv").config();
const express = require('express');
const app = express();
require("./db/conn")
const path = require('path');
const cors = require("cors");

const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/question.routes');
const quizTypeRoutes = require('./routes/quizType.routes');
const AsyncHandler = require("express-async-handler");



app.use(cors());
// Middleware to parse JSON in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hi', AsyncHandler(async (req, res) => {
  res.json({
    "msg": "Hello World"
  })


}));

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use("/api/quiz-types", quizTypeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
