require("dotenv").config();
const express = require('express');
const app = express();
require("./db/conn")
const path = require('path');
const cors = require("cors");

const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
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

app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
