const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

// const verifyToken = (req, res, next) => {
//   console.log(req.session);
//   if (!req.session || !req.session.token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   jwt.verify(req.session.token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized!" });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};

const isStudent = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    if (user.role === "student") {
      next();
    } else {
      return res.status(403).send({ message: "Require Student Role!" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};

module.exports = {
  // verifyToken,
  isAdmin,
  isStudent,
};
