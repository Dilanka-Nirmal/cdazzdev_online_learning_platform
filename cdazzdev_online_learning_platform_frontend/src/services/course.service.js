import axios from "axios";

const API_URL = "http://localhost:8080/api/course/";

const createCourse = (courseData) => {
  return axios.post(API_URL, courseData);
};

const getAllCourses = () => {
  return axios.get(API_URL);
};

const getCourseById = (id) => {
  return axios.get(API_URL + id);
};

const updateCourse = (id, courseData) => {
  return axios.put(API_URL + id, courseData);
};

const deleteCourse = (id) => {
  return axios.delete(API_URL + id);
};

const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

export default CourseService;
