import React, { useState, useEffect } from "react";
import CourseService from "../services/course.service";
import EnrollmentService from "../services/enrollment.service";
import AuthService from "../services/auth.service";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [userEnrollments, setUserEnrollments] = useState([]);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    refreshCourses();
    fetchUserEnrollments();
  }, []);

  // Fetch all courses
  const refreshCourses = () => {
    CourseService.getAllCourses().then(
      (response) => {
        setCourses(response.data);
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  };

  // Fetch user enrollments
  const fetchUserEnrollments = () => {
    const userId = currentUser ? currentUser.id : null;
    if (userId) {
      EnrollmentService.getUserEnrollments(userId).then(
        (response) => {
          setUserEnrollments(response.data);
        },
        (error) => {
          console.error("Error fetching user enrollments:", error);
        }
      );
    } else {
      console.error("User ID not found.");
    }
  };

  // Enroll in a course and confirm enrollment
  const handleEnroll = (courseId) => {
    console.log("Enrolling course with ID:", courseId);
    const userId = currentUser ? currentUser.id : null;
    if (userId && courseId) {
      EnrollmentService.createEnrollment(userId, courseId).then(
        (response) => {
          console.log("Enrolled successfully:", response.data);
          refreshCourses();
          fetchUserEnrollments(); // Refresh user enrollments after enrolling
        },
        (error) => {
          console.error("Error enrolling course:", error);
        }
      );
    } else {
      console.error("User ID or selected course ID not found.");
    }
  };

  // Unenroll from a course
  const unenrollCourse = (userId, courseId) => {
    console.log("Unenrolling course with ID:", courseId);
    if (userId) {
      EnrollmentService.deleteStudentEnrollment(userId, courseId).then(
        (response) => {
          console.log("Unenrolled successfully:", response.data);
          refreshCourses();
          fetchUserEnrollments(); // Refresh user enrollments after unenrolling
        },
        (error) => {
          console.error("Error unenrolling course:", error);
        }
      );
    } else {
      console.error("User ID not found.");
    }
  };
  
  // Check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    return userEnrollments.some((enrollment) => enrollment.course._id === courseId);
  };

  return (
    <div className="container">
      <h2>Student Dashboard</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card">
              <img src={course.image} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">Instructor: {course.instructor}</p>
                {isEnrolled(course._id) ? (
                  <button className="btn btn-danger" onClick={() => unenrollCourse(currentUser.id, course._id)}>Unenroll</button>
                ) : (
                  <button className="btn btn-success" onClick={() => handleEnroll(course._id)}>Enroll</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
