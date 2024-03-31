const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validToken = null;

// Sign up a new user
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if the role is valid
  try {
    if (role && !["student", "admin"].includes(role)) {
      return res.status(400).send({ message: "Invalid role specified." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    
    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "student"
    });

    await user.save();

    res.send({ message: "User was registered successfully!" });

  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating the user." });
  }
};

// Sign in a user
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Check if the password is valid
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // Create a token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    // Store the token in the session
    req.session.token = token;
    validToken = req.session.token;

    const role = user.role || "student";

    // Send the response
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      role,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while signing in." });
  }
};

// Verify the token
exports.verifyToken = (req, res, next) => {
  if (!validToken) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(validToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    // Set the user id in the request
    req.userId = decoded.id;
    next();
  });
};

// Sign out a user
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while signing out." });
  }
};
