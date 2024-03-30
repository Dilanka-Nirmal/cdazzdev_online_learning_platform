const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");

// Define routes for role-based access
router.get("/student", [authJwt.verifyToken, authJwt.isStudent], userController.studentBoard);
router.get("/student/:id", [authJwt.verifyToken, authJwt.isStudent], userController.getUserById);

router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);
router.get("/admin/all", [authJwt.verifyToken, authJwt.isAdmin], userController.getAllStudents);
router.get("/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.getUserById);
router.put("/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser);
router.delete("/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);

module.exports = router;
