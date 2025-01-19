const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Question schema
const userSchema = new Schema({

  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already taken"],
  },
  name: {
    type: String,
    default: "User",
  },

  password: {
    type: String,
    required: [false, "Please add the user password"],
  },
  token: {
    type: String,
    default: "",
  },
  sponsor: {
    type: String,
    default: "",
  },
  is_verified: {
    type: Boolean,
    default: true,
  },


  firebase_token: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },


},
  {
    timestamps: true,
  });

// Custom validator to ensure exactly 4 options

// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;