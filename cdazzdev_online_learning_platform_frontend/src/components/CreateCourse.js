import React, { useState } from 'react';
import CourseService from '../services/course.service';
import './styles/courseManagement.css';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    image: '',
    title: '',
    description: '',
    instructor: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Create new course
  const createCourse = async () => {
    try {
      const response = await CourseService.createCourse(courseData);
      setSuccessMessage('Course created successfully!');
    } catch (error) {
      setErrorMessage('Error creating course');
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse();
  };

  return (
    <div className="it19184722-myForm-adminDashboard">
      <h2 className="it19184722-h2">Create Course</h2>
      <form onSubmit={handleSubmit} className="form-group it19184722-myForm">
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          className="form-control"
          placeholder="Enter image URL"
          value={courseData.image}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit" className="btn btn-success">
          Create Course
        </button>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CreateCourse;
