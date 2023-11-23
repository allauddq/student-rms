import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:5000/students/${studentId}`);
      alert('Student deleted successfully!');
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>Name & Family Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentName}</td>
              <td>{student.dob}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDelete(student._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
