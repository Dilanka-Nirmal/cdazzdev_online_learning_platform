const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student" // Assuming default role is student
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

