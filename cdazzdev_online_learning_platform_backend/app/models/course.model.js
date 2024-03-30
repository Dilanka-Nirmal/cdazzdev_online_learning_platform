const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  image:{
    type: String,
    default: "https://imgur.com/MYdwNDz"
  },
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
