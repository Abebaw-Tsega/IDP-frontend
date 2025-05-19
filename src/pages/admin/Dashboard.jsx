// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getUsers, getDepartments, getCourses, getEnrollments, getCourseAssignments } from '../../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    departments: 0,
    courses: 0,
    enrollments: 0,
    assignments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, departments, courses, enrollments, assignments] = await Promise.all([
          getUsers(),
          getDepartments(),
          getCourses(),
          getEnrollments(),
          getCourseAssignments(),
        ]);
        setStats({
          users: users.length,
          departments: departments.length,
          courses: courses.length,
          enrollments: enrollments.length,
          assignments: assignments.length,
        });
      } catch (error) {
        toast.error('Error fetching stats: ' + error.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Departments</h2>
          <p className="text-2xl">{stats.departments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Courses</h2>
          <p className="text-2xl">{stats.courses}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Enrollments</h2>
          <p className="text-2xl">{stats.enrollments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-2xl">{stats.assignments}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/register-users" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center">
          Register Users
        </Link>
        <Link to="/admin/create-department" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center">
          Create Department
        </Link>
        <Link to="/admin/create-course" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center">
          Create Course
        </Link>
        <Link to="/admin/assign-instructor" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center">
          Assign Instructor
        </Link>
        <Link to="/admin/view-database" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center">
          View Database
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;