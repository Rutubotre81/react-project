import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetching the list of courses when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/courses')
      .then(response => {

        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle course deletion
  const handleDelete = (courseId) => {
    if (!courseId) {
      console.error('Invalid courseId');
      return;
    }

    axios.delete(`http://localhost:8080/course/${courseId}`)
      .then(response => {
        console.log(response.data);
        // Handle success response, e.g., update state to remove the deleted course
        setCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
      })
      .catch(error => {
        console.error(`Error deleting course: ${error.message}`);
      });
  };

  return (
    <div>
      <h1>Online Course Platform</h1>

      {/* Button to navigate to the "Add new course" page */}
      <button className='courseButton'>
        <Link to="/add">Add new course</Link>
      </button>

      <div className="courses">
        {/* Mapping through the list of courses to display each course */}
        {courses.map(course => (
          <div className="course" key={course.courseId}>
            <h2>{course.courseName}</h2>
            <p>{course.description}</p>

            {/* Button to delete the course */}
            <button
              className="delete"
              onClick={() => handleDelete(course.courseId)}
            >
              Delete Course 🗑
            </button>

            {/* Link to view the details of a specific course */}
            <Link to={`/course/${course.courseId}`}>
              <button className="view">View Course 👁️</button>
            </Link>

            {/* Link to update/edit a specific course */}
            <Link to={`/update/${course.courseId}`}>
              <button className="update">Update Course 🖊</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
