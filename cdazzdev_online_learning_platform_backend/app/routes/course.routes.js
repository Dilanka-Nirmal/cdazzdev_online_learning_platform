const express = require("express");
const router = express.Router();
const authJwt = require("../controllers/auth.controller");
const role = require("../middlewares/authJwt");
const courseController = require("../controllers/course.controller");

// Define routes for Course CRUD operations
router.post("/", [authJwt.verifyToken, role.isAdmin], courseController.createCourse);
router.get("/", [authJwt.verifyToken, role.isStudent], courseController.getAllCourses);
router.get("/:id", [authJwt.verifyToken, role.isStudent, role.isAdmin], courseController.getCourseById);
router.put("/:id", [authJwt.verifyToken, role.isAdmin], courseController.updateCourse);
router.delete("/:id", [authJwt.verifyToken, role.isAdmin], courseController.deleteCourse);

module.exports = router;
