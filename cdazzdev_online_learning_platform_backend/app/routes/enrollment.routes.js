const express = require("express");
const router = express.Router();
const authJwt = require("../controllers/auth.controller");
const role = require("../middlewares/authJwt");
const enrollmentController = require("../controllers/enrollment.controller");

// Define routes for Enrollment CRUD operations
router.post("/", [authJwt.verifyToken, role.isAdmin], enrollmentController.createEnrollment);
router.get("/", [authJwt.verifyToken], enrollmentController.getAllEnrollments);
router.get("/:id", [authJwt.verifyToken], enrollmentController.getEnrollmentById);
router.put("/:id", [authJwt.verifyToken, role.isAdmin], enrollmentController.updateEnrollment);
router.delete("/:id", [authJwt.verifyToken, role.isAdmin], enrollmentController.deleteEnrollment);

module.exports = router;
