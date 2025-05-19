// src/pages/student/Enroll.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, createEnrollment } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function Enroll() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: '',
    enrollment_date: new Date().toISOString().split('T')[0],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        toast.error('Error fetching courses: ' + error.message);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnrollment({ ...formData, user_id: user.user_id });
      toast.success('Enrollment successful');
      navigate('/student/dashboard');
    } catch (error) {
      toast.error('Error enrolling: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Enroll in a Course</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="course_id" className="block text-sm font-medium">
            Course
          </label>
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
        <div>
          <label htmlFor="enrollment_date" className="block text-sm font-medium">
            Enrollment Date
          </label>
          <input
            type="date"
            id="enrollment_date"
            value={formData.enrollment_date}
            onChange={(e) => setFormData({ ...formData, enrollment_date: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Enroll
        </button>
      </form>
    </div>
  );
}

export default Enroll;