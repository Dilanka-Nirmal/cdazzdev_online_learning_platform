import React, { useState, useEffect } from 'react';
import EnrollmentService from '../services/enrollment.service';
import './styles/enrollmentManagement.css';

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);

  // Fetching enrollment data
  useEffect(() => {
    async function fetchData() {
      const response = await EnrollmentService.getAllEnrollments();
      setEnrollments(response.data);
    }
    fetchData();
  }, []);

  // Delete an enrollment
  const deleteEnrollment = async (id) => {
    if (window.confirm(`Are you sure about deleting enrollment with ID ${id}?`)) {
      await EnrollmentService.deleteEnrollment(id);
      alert(`Enrollment with ID ${id} was deleted successfully!`);
      window.location.reload();
    }
  };

  return (
    <div className="it19184722-myForm-enrollmentManagement">
      <h2 className="it19184722-h2">Enrollment Management</h2>
      <div className="it19184722-myTable">
        <table className="it19184722-table">
          <thead className="it19184722-thead">
            <tr>
              <th className="it19184722-th">Student</th>
              <th className="it19184722-th">Course</th>
              <th className="it19184722-th">Action</th>
            </tr>
          </thead>
          <tbody className="it19184722-tbody">
            {enrollments.map((enrollment) => (
              <tr key={enrollment._id} className="it19184722-tr">
                <td className="it19184722-td">{enrollment.student}</td>
                <td className="it19184722-td">{enrollment.course}</td>
                <td className="it19184722-td">
                  <button onClick={() => deleteEnrollment(enrollment._id)} className="btn btn-danger it19184722-mybtn it19184722-red-btn">
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

export default EnrollmentManagement;
