const express = require("express");
const router = express.Router();
const authJwt = require("../controllers/auth.controller");
const role = require("../middlewares/authJwt");
const enrollmentController = require("../controllers/enrollment.controller");

// Define routes for Enrollment CRUD operations
router.post("/", [authJwt.verifyToken, role.isStudent], enrollmentController.createEnrollment);
router.get("/", [authJwt.verifyToken, role.isAdmin], enrollmentController.getAllEnrollments);
router.get("/:id", [authJwt.verifyToken], enrollmentController.getEnrollmentById);
router.get("/enroll/:id", [authJwt.verifyToken, role.isStudent], enrollmentController.getUserEnrollments);
router.put("/:id", [authJwt.verifyToken, role.isAdmin], enrollmentController.updateEnrollment);
router.delete("/:id", [authJwt.verifyToken], enrollmentController.deleteEnrollment);
router.delete("/remove/:userId/:courseId", [authJwt.verifyToken, role.isStudent], enrollmentController.deleteStudentEnrollment);


module.exports = router;
