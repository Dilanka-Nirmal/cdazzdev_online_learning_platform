const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const courseController = require("../controllers/course.controller");

// Define routes for Course CRUD operations
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], courseController.createCourse);
router.get("/", [authJwt.verifyToken], courseController.getAllCourses);
router.get("/:id", [authJwt.verifyToken], courseController.getCourseById);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], courseController.updateCourse);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], courseController.deleteCourse);

module.exports = router;
