import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseService from '../services/course.service';
import './styles/courseManagement.css';

const StudentManagement = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    image: '',
    title: '',
    description: '',
    instructor: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch course data by ID
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CourseService.getCourseById(id);
        const course = response.data;
        setCourseData({
          image: course.image,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
        });
      } catch (error) {
        setErrorMessage('Error fetching course data');
      }
    }
    fetchData();
  }, [id]);

  // Update course
  const updateCourse = async () => {
    try {
      const response = await CourseService.updateCourse(id, courseData);
      setSuccessMessage('Course updated successfully!');
    } catch (error) {
      setErrorMessage('Error updating course');
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse();
  };

  return (
    <div className="it19184722-myForm-adminDashboard">
      <h2 className="it19184722-h2">Update Course</h2>
      <form onSubmit={handleSubmit} className="form-group it19184722-myForm">
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          className="form-control"
          placeholder="Enter image URL"
          value={courseData.image}
          onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
          required
        />
        <br />
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter course title"
          value={courseData.title}
          onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
          required
        />
        <br />
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          rows="3"
          placeholder="Enter course description"
          value={courseData.description}
          onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
          required
        ></textarea>
        <br />
        <label>Instructor</label>
        <input
          type="text"
          name="instructor"
          className="form-control"
          placeholder="Enter instructor name"
          value={courseData.instructor}
          onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
          required
        />
        <br />
        <button type="submit" className="btn btn-success">
          Update Course
        </button>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default StudentManagement;
