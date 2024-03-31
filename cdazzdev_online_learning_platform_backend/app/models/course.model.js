const mongoose = require("mongoose");

// Define Course Schema
const CourseSchema = new mongoose.Schema({
  image:{
    type: String,
    default: "https://i.imgur.com/MYdwNDz.jpg"
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
