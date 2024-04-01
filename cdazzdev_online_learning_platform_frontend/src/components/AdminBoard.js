import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './styles/adminBoard.css';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const AdminBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="admin-board-container">
        <h2 className="dashboard-h2">Admin Dashboard</h2>
        <main className="page-content">
          <div className="card">
            <div className="content">
              <h2 className="title">Course Management</h2>
              <Link to='/admin/coursemng/view'><button className="btn btn-danger">View</button></Link>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <h2 className="title">Student Management</h2>
              <Link to='/admin/studentmng/view'><button  className="btn btn-danger">View</button></Link>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <h2 className="title">Enrollment Management</h2>
              <Link to='/admin/enrollmentmng/view'><button href="#" className="btn btn-danger">View</button></Link>
            </div>
          </div>
        </main>
    </div>
  );
};

export default AdminBoard;
