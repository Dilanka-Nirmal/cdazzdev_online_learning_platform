const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if role provided is valid
    if (role && !["student", "admin"].includes(role)) {
      return res.status(400).send({ message: "Invalid role specified." });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "student" // Default role is student if not provided
    });

    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating the user." });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    // Get user's role
    const role = user.role || "student"; // Default role if not specified

    // Assign the token to the session
    req.session.token = token;

    // Send the response
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      role, // Sending the role directly as a string
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while signing in." });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while signing out." });
  }
};
