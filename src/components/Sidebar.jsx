// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'student') return null;

  const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard' },
    { path: '/student/enroll', label: 'Enroll' },
    { path: '/student/grades', label: 'Grades' }, // New
  ];

  return (
    <div className="w-64 bg-blue-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Student Portal</h2>
      <nav className="space-y-2">
        {studentLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;