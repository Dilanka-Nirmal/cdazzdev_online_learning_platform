const db = require("../models");
const Enrollment = db.Enrollment;

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.student || !req.body.course) {
      return res.status(400).send({ message: "Both student and course fields are required!" });
    }

    // Create a new enrollment
    const enrollment = new Enrollment({
      student: req.body.student,
      course: req.body.course
    });

    // Save the enrollment to the database
    const savedEnrollment = await enrollment.save();
    res.status(201).send({ message: "Enrollment created successfully!", data: savedEnrollment });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating the enrollment." });
  }
};

// Retrieve all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({});
    res.status(200).send(enrollments);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving enrollments." });
  }
};

// Retrieve a single enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      res.status(404).send({ message: `Enrollment with id ${id} not found.` });
      return;
    }
    res.status(200).send(enrollment);
  } catch (err) {
    res.status(500).send({ message: err.message || `Error retrieving enrollment with id ${id}.` });
  }
};

// Update an enrollment by ID
exports.updateEnrollment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = req.params.id;
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEnrollment) {
      res.status(404).send({ message: `Cannot update enrollment with id ${id}. Enrollment not found.` });
      return;
    }
    res.status(200).send({ message: "Enrollment updated successfully!", data: updatedEnrollment });
  } catch (err) {
    res.status(500).send({ message: err.message || `Error updating enrollment with id ${id}.` });
  }
};

// Delete a student's enrollment by user ID and course ID
exports.deleteStudentEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Find and delete the enrollment
    const enrollment = await Enrollment.findOneAndDelete({ student: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).send({ message: 'Enrollment not found' });
    }

    res.status(200).send({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).send({ message: 'Error deleting enrollment' });
  }
};



// Delete the enrollment by ID
exports.deleteEnrollment = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEnrollment = await Enrollment.findByIdAndRemove(id);
    if (!deletedEnrollment) {
      res.status(404).send({ message: `Cannot delete enrollment with id ${id}. Enrollment not found.` });
      return;
    }
    res.status(200).send({ message: "Enrollment deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message || `Error deleting enrollment with id ${id}.` });
  }
};

// Fetch enrollments for a specific user
exports.getUserEnrollments = async (req, res) => {
  try {
    const userId = req.params.id;
    const enrollments = await Enrollment.find({ student: userId }).populate("course", ["title", "description", "instructor"]);
    res.status(200).send(enrollments);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error fetching user enrollments." });
  }
};

