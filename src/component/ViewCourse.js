import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewCourse = () => {
  // Extracting the courseId from the URL params
  const { id: courseId } = useParams();

  // State to store the course details
  const [course, setCourse] = useState(null);

  // React Router's navigate hook
  const navigate = useNavigate();

  // Fetching the course details when the component mounts
  useEffect(() => {
    // Fetching course data from the API based on the courseId
    axios
      .get(`http://localhost:8080/course/${courseId}`)
      .then((response) => {
        // Logging courseId for debugging (you can remove this in the final version)
        console.log('Course ID:', courseId);
        
        // Setting the course data in the state
        setCourse(response.data);
      })
      .catch((error) => {
        // Handling errors during data fetching
        console.error('Error fetching course data:', error);
      });
  }, [courseId]);

  // Rendering the component content based on the fetched data
  if (!course) {
    // Displaying a loading message while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Displaying course details */}
      <h2>Course Details</h2>
      <p>COURSE_ID: {course.courseId}</p>
      <p>COURSE_NAME: {course.courseName}</p>
      <p>DESCRIPTION: {course.description}</p>

      {/* Link to navigate back to the courses list */}
      <Link to="/courses">Click here to see all courses available</Link>
    </div>
  );
};

export default ViewCourse;
