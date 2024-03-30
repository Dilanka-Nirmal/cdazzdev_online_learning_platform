const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
  ],
  controller.signup
);

router.post("/signin", controller.signin);

router.post("/signout", controller.signout);

module.exports = router;
