require("dotenv").config();
const express = require('express');
const app = express();
require("./db/conn") 
const path = require('path'); // Add this line
 
const questionRoutes = require('./routes/questionRoutes');
const AsyncHandler = require("express-async-handler"); 


// Middleware to parse JSON in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hi', AsyncHandler(async(req,res)=>{
  res.json({
     "msg": "Hello World"
  })
   

})); 
   
app.use('/api/questions', questionRoutes);
 
const PORT  = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
