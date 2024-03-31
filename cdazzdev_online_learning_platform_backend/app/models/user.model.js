const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

