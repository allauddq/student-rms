import React, { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    email: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    studentName: "",
    dob: "",
    email: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "firstName" || e.target.name === "familyName") {
      // If either first name or family name changes, update studentName
      setFormData({
        ...formData,
        studentName: `${formData.firstName} ${formData.familyName}`,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidDateOfBirth = (dob) => {
    const currentDate = new Date();
    const inputDate = new Date(dob);

    // Calculate age in milliseconds
    const ageInMilliseconds = currentDate - inputDate;

    // Calculate age in days
    const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);

    // Validate if the age is at least 10 years (3652.5 days to account for leap years)
    return ageInDays >= 3652.5;
  };

  const validateForm = () => {
    const { firstName, familyName, dob, email } = formData;
    const errors = {
      firstName: "",
      familyName: "",
      dob: "",
      email: "",
    };

    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!familyName.trim()) {
      errors.familyName = "Family Name is required";
    }

    if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!isValidDateOfBirth(dob)) {
      errors.dob =
        "Please enter a valid date of birth. Students must be at least 10 years old.";
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/students", formData);
      alert("Student added successfully!");
      setFormData({ firstName: "", familyName: "", dob: "", email: "" });
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  return (
    <div className='form-container'>
      <h2>Add New Students</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={{ borderColor: validationErrors.firstName ? "red" : "" }}
        />
        <div style={{ color: "red" }}>{validationErrors.firstName}</div>

        <label>Family Name:</label>
        <input
          type="text"
          name="familyName"
          value={formData.familyName}
          onChange={handleChange}
          required
          style={{ borderColor: validationErrors.familyName ? "red" : "" }}
        />
        <div style={{ color: "red" }}>{validationErrors.familyName}</div>

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          style={{ borderColor: validationErrors.dob ? "red" : "" }}
        />
        <div style={{ color: "red" }}>{validationErrors.dob}</div>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ borderColor: validationErrors.email ? "red" : "" }}
        />
        <div style={{ color: "red" }}>{validationErrors.email}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudent;
