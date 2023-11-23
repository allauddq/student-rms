import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentsList from './components/StudentsList';
import AddCourse from './components/AddCourse';
import CoursesList from './components/CoursesList';
import AddResult from './components/AddResult';
import ResultsList from './components/ResultsList';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-student">Add New Students</Link></li>
            <li><Link to="/students-list">Students List</Link></li>
            <li><Link to="/add-course">Add New Courses</Link></li>
            <li><Link to="/courses-list">Courses List</Link></li>
            <li><Link to="/add-result">Add New Results</Link></li>
            <li><Link to="/results-list">Results List</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students-list" element={<StudentsList />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/courses-list" element={<CoursesList />} />
            <Route path="/add-result" element={<AddResult />} />
            <Route path="/results-list" element={<ResultsList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
