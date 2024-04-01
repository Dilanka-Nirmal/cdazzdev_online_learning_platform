import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import StudentBoard from "./components/StudentBoard";
import AdminBoard from "./components/AdminBoard";
import CourseManagement from "./components/CourseManagement";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import StudentManagement from "./components/StudentManagement";
import EnrollmentManagement from "./components/EnrollmentManagement";

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showStudentBoard, setStudentBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setStudentBoard(user.role === "student");
      setShowAdminBoard(user.role === "admin");
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          CDAZZDEV online learning platform
        </Link>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Dashboard
              </Link>
            </li>
          )}

          {showStudentBoard && (
            <li className="nav-item">
              <Link to={"/student"} className="nav-link">
                Student Dashboard
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/student" element={<StudentBoard />} />
          <Route path="/admin" element={<AdminBoard />} />
          <Route path="/admin/coursemng/view" element={<CourseManagement />} />
          <Route path="/admin/coursemng/create" element={<CreateCourse />} />
          <Route path="/admin/coursemng/update/:id" element={<UpdateCourse />} />
          <Route path="/admin/studentmng/view" element={<StudentManagement />} />
          <Route path="/admin/enrollmentmng/view" element={<EnrollmentManagement />} />
        </Routes>
      </div>

      {currentUser && <AuthVerify showAdminBoard={showAdminBoard} showStudentBoard={showStudentBoard} logOut={logOut} />}
    </div>
  );
}

export default App;
