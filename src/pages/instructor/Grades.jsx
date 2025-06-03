// src/pages/instructor/Grades.jsx
import React, { useState, useEffect } from 'react';
import { getCourseAssignments, getEnrollmentsByCourse, getGradeByEnrollment, submitGrade } from '../../services/api';
import toast from 'react-hot-toast';

const InstructorGrades = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState({});
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCoursesAndEnrollments = async () => {
    try {
      const assignedCourses = await getCourseAssignments();
      setCourses(assignedCourses);

      const enrollmentsData = {};
      const gradesData = {};
      for (const course of assignedCourses) {
        const courseEnrollments = await getEnrollmentsByCourse(course.course_id);
        enrollmentsData[course.course_id] = courseEnrollments;

        for (const enrollment of courseEnrollments) {
          const gradeData = await getGradeByEnrollment(enrollment.enrollment_id);
          gradesData[enrollment.enrollment_id] = gradeData.grade || '';
        }
      }
      setEnrollments(enrollmentsData);
      setGrades(gradesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // toast.error('Failed to load courses and enrollments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesAndEnrollments();
  }, []);

  const handleGradeSubmit = async (enrollmentId) => {
    const grade = grades[enrollmentId];
    if (!grade || grade.trim() === '') {
      toast.error('Please enter a valid grade');
      return;
    }

    try {
      await submitGrade(enrollmentId, grade);
      toast.success('Grade submitted successfully');
    } catch (error) {
      console.error('Error submitting grade:', error);
      toast.error('Failed to submit grade');
    }
  };

  const handleGradeChange = (enrollmentId, value) => {
    setGrades((prev) => ({
      ...prev,
      [enrollmentId]: value,
    }));
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Grade Students</h1>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses assigned to you.</p>
      ) : (
        courses.map((course) => (
          <div key={course.course_id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {course.course_code} - {course.course_name} ({course.semester} {course.academic_year})
            </h2>
            {enrollments[course.course_id]?.length > 0 ? (
              <table className="w-full border-collapse bg-white shadow rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Student Name</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Grade</th>
                    <th className="border p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments[course.course_id].map((enrollment) => (
                    <tr key={enrollment.enrollment_id}>
                      <td className="border p-2">{`${enrollment.first_name} ${enrollment.last_name}`}</td>
                      <td className="border p-2">{enrollment.email}</td>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={grades[enrollment.enrollment_id] || ''}
                          onChange={(e) => handleGradeChange(enrollment.enrollment_id, e.target.value)}
                          placeholder="e.g., A, B+, 90"
                          className="border rounded p-1 w-20"
                        />
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleGradeSubmit(enrollment.enrollment_id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Submit Grade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No students enrolled in this course.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InstructorGrades;