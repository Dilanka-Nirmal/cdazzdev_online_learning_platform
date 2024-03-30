const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Course = require("./course.model");
const Enrollment = require("./enrollment.model");
const User = require("./user.model");

const db = {
  mongoose: mongoose,
  Course: Course,
  Enrollment: Enrollment,
  User: User
};

module.exports = db;
