import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {
  // Extracting the courseId from the URL params
  const { id: courseId } = useParams();

  // React Router's navigate hook
  const navigate = useNavigate();

  // State to store the updated course information
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    description: "",
  });

  // Fetching the existing course data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:8080/course/${courseId}`)
      .then(response => {
        setNewCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [courseId]);

  // Function to handle the form submission for updating the course
  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8080/course/${courseId}`, newCourse)
      .then(response => {
        console.log('Course updated:', response.data);
        navigate('/courses'); // Redirect after successful update
      })
      .catch(error => {
        console.error('Error updating course:', error);
      });
  };

  return (
    <div className='form'>
      <h1>Update selected Course</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Input field for Course Name */}
        <label>Course Name</label>
        <input
          type="text"
          placeholder="Insert Course Name Here"
          value={newCourse.courseName}
          onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
          name="title"
        />

        {/* Input field for Course Description */}
        <label>Description</label>
        <textarea
          id="description"
          placeholder="Insert Description Here"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          rows={4} // Adjust the number of rows as needed
        />

        {/* Button to submit the form and update the course */}
        <button className='formButton'>Update Course</button>

        {/* Link to navigate back to the course list */}
        <Link to="/">Click here to see all courses available</Link>
      </form>
    </div>
  );
};

export default UpdateCourse;
