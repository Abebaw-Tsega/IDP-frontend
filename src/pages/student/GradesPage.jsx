// src/pages/student/GradesPage.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentGrades } from '../../services/api';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const GradesPage = () => {
  const { user } = useAuth();
  const [semesters, setSemesters] = useState({});
  const [selectedSemester, setSelectedSemester] = useState('');
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'student') {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await getStudentGrades();
        setSemesters(data);
        const firstSemester = Object.keys(data)[0];
        setSelectedSemester(firstSemester || '');
      } catch (error) {
        toast.error('Failed to load grades');
        console.error('Error fetching grades:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  const currentSemester = semesters[selectedSemester] || {
    name: 'No Data',
    gpa: 0,
    creditsCompleted: 0,
    courses: [],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Record</h2>
              {loading ? (
                <p className="text-gray-600">Loading grades...</p>
              ) : Object.keys(semesters).length === 0 ? (
                <p className="text-gray-600">No grades available</p>
              ) : (
                <div className="flex justify-between items-center">
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    {Object.keys(semesters).map((key) => (
                      <option key={key} value={key}>
                        {semesters[key].name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-6 text-gray-600">
                    <div>
                      GPA: <span className="font-semibold">{currentSemester.gpa}</span>
                    </div>
                    <div>
                      Credits:{' '}
                      <span className="font-semibold">{currentSemester.creditsCompleted}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-gray-700 font-semibold">Course Code</th>
                    <th className="p-3 text-gray-700 font-semibold">Course Name</th>
                    <th className="p-3 text-gray-700 font-semibold">Credits</th>
                    <th className="p-3 text-gray-700 font-semibold">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSemester.courses.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-3 text-gray-600 text-center">
                        No courses available
                      </td>
                    </tr>
                  ) : (
                    currentSemester.courses.map((course) => (
                      <tr key={course.code} className="border-b border-gray-200">
                        <td className="p-3 text-gray-600">{course.code}</td>
                        <td className="p-3 text-gray-600">{course.name}</td>
                        <td className="p-3 text-gray-600">{course.credits}</td>
                        <td className="p-3 text-gray-600">{course.grade}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default GradesPage;