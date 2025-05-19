// src/pages/admin/AssignInstructor.jsx
import React, { useState, useEffect } from 'react';
import { createCourseAssignment, getCourses, getInstructors } from '../../services/api';
import toast from 'react-hot-toast';

function AssignInstructor() {
  const [formData, setFormData] = useState({
    instructor_id: '',
    course_id: '',
  });
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instructorData, courseData] = await Promise.all([
          getInstructors(),
          getCourses(),
        ]);
        setInstructors(instructorData);
        setCourses(courseData);
      } catch (error) {
        toast.error('Error fetching data: ' + error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourseAssignment(formData);
      toast.success('Instructor assigned successfully');
      setFormData({ instructor_id: '', course_id: '' });
    } catch (error) {
      toast.error('Failed to assign instructor: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assign Instructor</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="instructor_id" className="block text-sm font-medium">Instructor</label>
          <select
            id="instructor_id"
            value={formData.instructor_id}
            onChange={(e) => setFormData({ ...formData, instructor_id: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select an instructor</option>
            {instructors.map(instructor => (
              <option key={instructor.user_id} value={instructor.user_id}>
                {instructor.first_name} {instructor.last_name} ({instructor.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="course_id" className="block text-sm font-medium">Course</label>
          <select
            id="course_id"
            value={formData.course_id}
            onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name} ({course.course_code})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Assign Instructor
        </button>
      </form>
    </div>
  );
}

export default AssignInstructor;