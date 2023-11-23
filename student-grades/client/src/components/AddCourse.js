import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate and submit data to the backend
      await axios.post('http://localhost:5000/courses', formData);
      alert('Course added successfully!');
      setFormData({ courseName: '' });
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
  };

  return (
    <div className='form-container'>
      <h2>Add New Courses</h2>
      <form onSubmit={handleSubmit}>
        <label>Course Name:</label>
        <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCourse;
