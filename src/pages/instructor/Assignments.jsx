// src/pages/instructor/Assignments.jsx
import React, { useState, useEffect } from 'react';
import { getCourseAssignments } from '../../services/api';
// import toast from 'react-hot-toast';

const InstructorAssignments = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const assignedCourses = await getCourseAssignments();
      setCourses(assignedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // toast.error('Failed to load assigned courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses assigned to you.</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.course_id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">
                {course.course_code} - {course.course_name} ({course.semester} {course.academic_year})
              </h2>
              <p className="text-gray-600 mt-2">
                {/* Placeholder for assignment details */}
                No assignments added yet. (Feature to be implemented)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorAssignments;