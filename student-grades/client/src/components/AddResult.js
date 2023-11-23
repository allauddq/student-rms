import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddResult = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    studentName: '',
    score: '',
  });

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch courses and students for dropdowns
    const fetchCoursesAndStudents = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:5000/courses');
        const studentsResponse = await axios.get('http://localhost:5000/students');

        setCourses(coursesResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Error fetching courses and students:', error.message);
      }
    };

    fetchCoursesAndStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate and submit data to the backend
      await axios.post('http://localhost:5000/results', formData);
      alert('Result added successfully!');
      setFormData({ courseName: '', studentName: '', score: '' });
    } catch (error) {
      console.error('Error adding result:', error.message);
    }
  };

  return (
    <div className='form-container'>
      <h2>Add New Results</h2>
      <form onSubmit={handleSubmit}>
        <label>Course Name:</label>
        <select name="courseName" value={formData.courseName} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course.courseName}>
              {course.courseName}
            </option>
          ))}
        </select>

        <label>Student Name:</label>
        <select name="studentName" value={formData.studentName} onChange={handleChange} required>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student.studentName}>
              {student.studentName}
            </option>
          ))}
        </select>

        <label>Score:</label>
        <select name="score" value={formData.score} onChange={handleChange} required>
          <option value="">Select Score</option>
          {/* Add other score options as needed */}
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddResult;
