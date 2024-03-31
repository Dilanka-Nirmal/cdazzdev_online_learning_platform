const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");

// Define routes for user authentication
const express = require("express");
const router = express.Router();

// Set the CORS policy for the router
router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

// Define routes for user authentication
router.post("/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
  ],
  controller.signup
);

router.post("/signin", controller.signin);

router.post("/signout", controller.signout);

module.exports = router;
