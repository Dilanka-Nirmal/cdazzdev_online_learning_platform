const db = require("../models");
const User = db.User;

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
  }
};

// Get all users with role as student
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving students." });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: `User with id ${id} not found.` });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: `Error retrieving user with id ${id}: ${err.message}` });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).send({ message: `User with id ${id} not found.` });
      return;
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send({ message: `Error updating user with id ${id}: ${err.message}` });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      res.status(404).send({ message: `User with id ${id} not found.` });
      return;
    }
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: `Error deleting user with id ${id}: ${err.message}` });
  }
};

// Board for student role
exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

// Board for admin role
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
