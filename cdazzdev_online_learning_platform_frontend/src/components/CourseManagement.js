import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseService from '../services/course.service';
import './styles/courseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  // Fetching course data
  useEffect(() => {
    async function fetchData() {
      const response = await CourseService.getAllCourses();
      setCourses(response.data);
    }
    fetchData();
  }, []);

  // Delete a course
  const deleteCourse = async (id, title) => {
    if (window.confirm(`Are you sure about deleting ${title}?`)) {
      await CourseService.deleteCourse(id);
      alert(`Course ${title} was deleted successfully!`);
      window.location.reload();
    }
  };

  return (
    <div className="it19184722-myForm-adminDashboard">
      <h2 className="it19184722-h2">Course Management</h2>
      <div className="it19184722-headerSection">
        <Link to="/admin/coursemng/create" className="btn it19184722-green-btn">
          Create new course
        </Link>
      </div>
      <div className="it19184722-myTable">
        <table className="it19184722-table">
          <thead className="it19184722-thead">
            <tr>
              <th className="it19184722-th">Title</th>
              <th className="it19184722-th">Description</th>
              <th className="it19184722-th">Instructor</th>
              <th className="it19184722-th">Action</th>
            </tr>
          </thead>
          <tbody className="it19184722-tbody">
            {courses.map((course) => (
              <tr key={course._id} className="it19184722-tr">
                <td className="it19184722-td">{course.title}</td>
                <td className="it19184722-td">{course.description}</td>
                <td className="it19184722-td">{course.instructor}</td>
                <td className="it19184722-td">
                  <Link className="btn it19184722-green-btn it19184722-mybtn" to={`/admin/coursemng/update/${course._id}`}>
                    Update
                  </Link>
                  <button onClick={() => deleteCourse(course._id, course.title)} className="btn btn-danger it19184722-mybtn it19184722-red-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagement;
