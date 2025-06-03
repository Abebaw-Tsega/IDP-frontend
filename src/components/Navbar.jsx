// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      console.log('Logout clicked'); // Debug
      await logout();
      console.log('Logout successful'); // Debug
    } catch (error) {
      console.error('Logout error in Navbar:', error.message); // Debug
    }
  };

  const getNavItems = () => {
    const commonItems = [
      { path: '/', label: 'Home' },
      { path: '/contact', label: 'Contact' },
      { path: '/about', label: 'About' },
      { path: '/privacy-policy', label: 'Privacy Policy' },
    ];

    if (!user) {
      return [...commonItems, { path: '/register-student', label: 'Register' }];
    }

    const roleItems = {
      student: [{ path: '/student/dashboard', label: 'Student Dashboard' }],
      instructor: [{ path: '/instructor/dashboard', label: 'Instructor Dashboard' }],
      admin: [
        { path: '/admin/dashboard', label: 'Admin Dashboard' },
        { path: '/admin/register-users', label: 'Register Users' },
        { path: '/admin/view-database', label: 'View Database' },
      ],
    };

    return [...commonItems, ...(roleItems[user.role] || [])];
  };

  const navItems = getNavItems();

  return (
    <nav className="text-white bg-blue-700 shadow-md" aria-label="Main navigation">
      <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
        <div className="text-2xl font-bold">
          <NavLink
            to="/"
            className="rounded hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            UniversitySys
          </NavLink>
        </div>

        <button
          className="p-2 rounded-lg md:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="items-center hidden space-x-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-gray-300 text-lg px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded text-lg"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `bg-white text-blue-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded text-lg ${isActive ? 'ring-2 ring-blue-300' : ''}`
              }
            >
              Login
            </NavLink>
          )}
        </div>

        <div className={`w-full md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col p-4 space-y-4 text-center bg-blue-800 rounded-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-gray-300 text-lg py-2 px-4 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-lg font-semibold text-blue-700 bg-white rounded hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 text-lg font-semibold text-blue-700 bg-white rounded hover:bg-gray-100"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;