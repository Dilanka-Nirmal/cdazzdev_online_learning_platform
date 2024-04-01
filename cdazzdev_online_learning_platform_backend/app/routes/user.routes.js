const express = require("express");
const router = express.Router();
const authJwt  = require("../controllers/auth.controller");
const role = require("../middlewares/authJwt");
const userController = require("../controllers/user.controller");

// Define routes for role-based access
router.get("/admin", [authJwt.verifyToken, role.isAdmin], userController.adminBoard);
router.get("/student", [authJwt.verifyToken , role.isStudent], userController.studentBoard);
router.get("/:id", [authJwt.verifyToken, role.isStudent], userController.getUserById);
router.get("/all", [authJwt.verifyToken, role.isAdmin], userController.getAllStudents);
router.get("/:id", [authJwt.verifyToken, role.isAdmin], userController.getUserById);
router.put("/:id", [authJwt.verifyToken, role.isAdmin], userController.updateUser);
router.delete("/:id", [authJwt.verifyToken, role.isAdmin], userController.deleteUser);

module.exports = router;
