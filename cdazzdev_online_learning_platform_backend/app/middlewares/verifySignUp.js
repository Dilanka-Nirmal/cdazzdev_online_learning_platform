const db = require("../models");
const User = db.User;

// Check if the username or email is already in use
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check if username is already in use
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Check if email is already in use
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    // If neither username nor email is in use, proceed to the next middleware
    next();
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while checking duplicate username or email." });
  }
};

// Module exports
module.exports = {
  checkDuplicateUsernameOrEmail
};
