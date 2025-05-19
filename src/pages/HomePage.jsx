// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HomePage() {
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return '/login';
    return {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    }[user.role];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <section className="py-20 text-white bg-blue-700">
        <div className="container px-6 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Welcome to University Student Management System
          </h1>
          <p className="mb-8 text-lg md:text-2xl">
            Manage students, instructors, and administration easily in one platform.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <Link
                to={getDashboardPath()}
                className="px-6 py-3 font-semibold text-blue-700 bg-white rounded hover:bg-gray-100"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register-student"
                  className="px-6 py-3 font-semibold text-blue-700 bg-white rounded hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 font-semibold bg-transparent border border-white rounded hover:bg-white hover:text-blue-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container px-6 py-16 mx-auto">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="p-8 text-center transition bg-white rounded-lg shadow-lg hover:shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold">Student Registration</h2>
            <p className="text-gray-600">
              Easily register and manage student information with our intuitive system.
            </p>
          </div>
          <div className="p-8 text-center transition bg-white rounded-lg shadow-lg hover:shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold">Instructor Dashboard</h2>
            <p className="text-gray-600">
              Instructors can view and manage their assigned students and courses.
            </p>
          </div>
          <div className="p-8 text-center transition bg-white rounded-lg shadow-lg hover:shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold">Admin Management</h2>
            <p className="text-gray-600">
              Full administrative control over users, reports, and system settings.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
          <p className="mb-6">Register now and manage your university easily!</p>
          {user ? (
            <Link
              to={getDashboardPath()}
              className="px-6 py-3 font-semibold text-blue-700 bg-white rounded hover:bg-gray-100"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/register-student"
              className="px-6 py-3 font-semibold text-blue-700 bg-white rounded hover:bg-gray-100"
            >
              Register Student
            </Link>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;