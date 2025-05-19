// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
  const { user } = useContext(AuthContext);

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard' },
    { name: 'Enroll', path: '/student/enroll' },
  ];

  const instructorLinks = [
    { name: 'Dashboard', path: '/instructor/dashboard' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Register Users', path: '/admin/register-users' },
    { name: 'Create Department', path: '/admin/create-department' },
    { name: 'Create Course', path: '/admin/create-course' },
    { name: 'Assign Instructor', path: '/admin/assign-instructor' },
    { name: 'View Database', path: '/admin/view-database' },
  ];

  const links = user.role === 'student' ? studentLinks :
    user.role === 'instructor' ? instructorLinks :
      adminLinks;

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path} className="mb-2">
            <Link
              to={link.path}
              className="block p-2 hover:bg-gray-700 rounded"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;