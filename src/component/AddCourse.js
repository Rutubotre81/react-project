import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddCourse = () => {
  console.log('AddCourse component rendered');
  // State to store the new course information
  const [newCourse, setNewCourse] = useState({
    courseId: "", // Assuming this will be automatically generated
    courseName: "",
    description: "",
  });

  // React Router's navigate hook
  const navigate = useNavigate();

  // Function to handle adding a new course
  const handleAddCourse = () => {
    console.trace('handleAddCourse called');
    // Implement logic to add the new course using the API
    axios
      .post('http://localhost:8080/course', newCourse)
      .then(response => {
        console.log('Course added:', response.data);
        // Navigate back to the course list after successful addition
        navigate('/courses');
      })
      .catch(error => {
        console.error('Error adding course:', error);
      });
  };

  return (
    <div className='form'>
      <h1>Add new Course</h1>
      <form>
        {/* Input field for Course Name */}
        <label htmlFor="courseName">Course Name</label>
        <input
          type="text"
          id="courseName"
          placeholder="Insert Course Name Here"
          value={newCourse.courseName}
          onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
        />

        {/* Input field for Course Description */}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Insert Description Here"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />

        {/* Button to trigger the course addition */}
        <button className='formButton' type="button" onClick={handleAddCourse}>
          Finish
        </button>

        {/* Link to navigate back to the course list */}
        <Link to="/">Click here to see all courses available</Link>
      </form>
    </div>
  );
};

export default AddCourse;
