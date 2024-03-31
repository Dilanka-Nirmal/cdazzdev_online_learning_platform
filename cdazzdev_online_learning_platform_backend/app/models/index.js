const mongoose = require('mongoose');

// Set the mongoose promise to the global promise
mongoose.Promise = global.Promise;

// Import the models
const Course = require("./course.model");
const Enrollment = require("./enrollment.model");
const User = require("./user.model");

// Define the Models object to export
const db = {
  mongoose: mongoose,
  Course: Course,
  Enrollment: Enrollment,
  User: User
};

module.exports = db;
