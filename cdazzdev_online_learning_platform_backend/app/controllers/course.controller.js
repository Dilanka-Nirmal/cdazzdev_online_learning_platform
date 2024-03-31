const db = require("../models");
const Course = db.Course;

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.instructor) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const course = new Course({
      image: req.body.image || "https://i.imgur.com/MYdwNDz.jpg",
      title: req.body.title,
      description: req.body.description,
      instructor: req.body.instructor
    });

    const savedCourse = await course.save();
    res.status(201).send({ message: "Course created successfully!", data: savedCourse });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating the course." });
  }
};

// Retrieve all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving courses." });
  }
};

// Retrieve a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).send({ message: `Course with id ${id} not found.` });
      return;
    }
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send({ message: err.message || `Error retrieving course with id ${id}.` });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      res.status(404).send({ message: `Cannot update course with id ${id}. Course not found.` });
      return;
    }
    res.status(200).send({ message: "Course updated successfully!", data: updatedCourse });
  } catch (err) {
    res.status(500).send({ message: err.message || `Error updating course with id ${id}.` });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCourse = await Course.findByIdAndRemove(id);
    if (!deletedCourse) {
      res.status(404).send({ message: `Cannot delete course with id ${id}. Course not found.` });
      return;
    }
    res.status(200).send({ message: "Course deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message || `Error deleting course with id ${id}.` });
  }
};
