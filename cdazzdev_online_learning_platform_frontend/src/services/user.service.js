import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getStudentBoard = () => {
  return axios.get(API_URL + "student");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getStudentBoard,
  getAdminBoard,
}

export default UserService;
