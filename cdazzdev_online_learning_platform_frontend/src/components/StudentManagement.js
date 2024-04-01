import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import './styles/studentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);

  // Fetching student data
  useEffect(() => {
    async function fetchData() {
      const response = await UserService.getAllStudents();
      setStudents(response.data);
    }
    fetchData();
  }, []);

  // Delete a student
  const deleteStudent = async (id, username) => {
    if (window.confirm(`Are you sure about deleting ${username}?`)) {
      await UserService.deleteUser(id);
      alert(`Student ${username} was deleted successfully!`);
      window.location.reload();
    }
  };

  return (
    <div className="it19184722-myForm-studentManagement">
      <h2 className="it19184722-h2">Student Management</h2>
      <div className="it19184722-myTable">
        <table className="it19184722-table">
          <thead className="it19184722-thead">
            <tr>
              <th className="it19184722-th">Username</th>
              <th className="it19184722-th">Email</th>
              <th className="it19184722-th">Role</th>
              <th className="it19184722-th">Action</th>
            </tr>
          </thead>
          <tbody className="it19184722-tbody">
            {students.map((student) => (
              <tr key={student._id} className="it19184722-tr">
                <td className="it19184722-td">{student.username}</td>
                <td className="it19184722-td">{student.email}</td>
                <td className="it19184722-td">{student.role}</td>
                <td className="it19184722-td">
                  <button onClick={() => deleteStudent(student._id, student.username)} className="btn btn-danger it19184722-mybtn it19184722-red-btn">
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

export default StudentManagement;
