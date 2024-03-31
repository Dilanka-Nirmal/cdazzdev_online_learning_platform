import axios from "axios";

const API_URL = "http://localhost:8080/api/enrollment/";

// const createEnrollment = (enrollmentData) => {
//   return axios.post(API_URL, enrollmentData);
// };

// const createEnrollment = (studentId, courseId) => {
//   return axios.post(API_URL, { student: studentId, course: courseId });
// };

const createEnrollment = (studentId, courseId) => {
  console.log("Creating enrollment with student ID:", studentId, "and course ID:", courseId);
  return axios.post(API_URL, { student: studentId, course: courseId });
};


const getAllEnrollments = () => {
  return axios.get(API_URL);
};

const getEnrollmentById = (id) => {
  return axios.get(API_URL + id);
};

const updateEnrollment = (id, enrollmentData) => {
  return axios.put(API_URL + id, enrollmentData);
};

const deleteEnrollment = (id) => {
  return axios.delete(API_URL + id);
};

const deleteStudentEnrollment = (userId, courseId) => {
  return axios.delete(`${API_URL}remove/${userId}/${courseId}`);
};


const getUserEnrollments = (id) => {
  return axios.get(API_URL + `enroll/${id}`);
};


const EnrollmentService = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteStudentEnrollment,
  deleteEnrollment,
  getUserEnrollments
};

export default EnrollmentService;
