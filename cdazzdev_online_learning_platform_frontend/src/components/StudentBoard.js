import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import CourseService from "../services/course.service";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses for the student
    CourseService.getStudentCourses().then(
      (response) => {
        setCourses(response.data);
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  }, []);

  const enrollCourse = (courseId) => {
    UserService.enrollCourse(courseId).then(
      (response) => {
        // Handle success
        console.log("Enrolled successfully:", response.data);
        // Refresh the list of courses after enrolling
        CourseService.getStudentCourses().then(
          (response) => {
            setCourses(response.data);
          },
          (error) => {
            console.error("Error fetching courses after enrollment:", error);
          }
        );
      },
      (error) => {
        console.error("Error enrolling course:", error);
      }
    );
  };

  const unenrollCourse = (courseId) => {
    UserService.unenrollCourse(courseId).then(
      (response) => {
        // Handle success
        console.log("Unenrolled successfully:", response.data);
        // Refresh the list of courses after unenrolling
        CourseService.getStudentCourses().then(
          (response) => {
            setCourses(response.data);
          },
          (error) => {
            console.error("Error fetching courses after unenrollment:", error);
          }
        );
      },
      (error) => {
        console.error("Error unenrolling course:", error);
      }
    );
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
                <button className="btn btn-success mr-2" onClick={() => enrollCourse(course._id)}>Enroll</button>
                <button className="btn btn-danger" onClick={() => unenrollCourse(course._id)}>Unenroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
