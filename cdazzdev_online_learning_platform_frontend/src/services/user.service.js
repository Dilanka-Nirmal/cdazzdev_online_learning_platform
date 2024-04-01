import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getAllStudents = () => {
  return axios.get(API_URL);
}

const getUserById = (id) => {
  return axios.get(API_URL + id);
};

const updateUser = (id, userData) => {
  return axios.put(API_URL + id, userData);
};

const deleteUser = (id) => {
  return axios.delete(API_URL + id);
};

const getStudentBoard = () => {
  return axios.get(API_URL + "student");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getStudentBoard,
  getAdminBoard,
  getAllStudents,
  getUserById,
  updateUser,
  deleteUser
}

export default UserService;
