// src/pages/student/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnrollments, updateEnrollment } from '../../services/api';
import CourseCard from '../../components/CourseCard';
import toast from 'react-hot-toast';

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await getEnrollments();
        setEnrollments(data);
      } catch (error) {
        toast.error('Error fetching enrollments: ' + error.message);
      }
    };
    fetchEnrollments();
  }, []);

  const handleDrop = async (enrollmentId) => {
    try {
      await updateEnrollment(enrollmentId, { status: 'dropped' });
      setEnrollments(enrollments.map(e =>
        e.enrollment_id === enrollmentId ? { ...e, status: 'dropped' } : e
      ));
      toast.success('Course dropped successfully');
    } catch (error) {
      toast.error('Error dropping course: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <button
        onClick={() => navigate('/student/enroll')}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Enroll in a Course
      </button>
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrollments.length === 0 ? (
          <p className="text-gray-600">No enrollments found.</p>
        ) : (
          enrollments.map(enrollment => (
            <CourseCard
              key={enrollment.enrollment_id}
              enrollment={enrollment}
              onDrop={handleDrop}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;