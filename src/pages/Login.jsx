// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster, toast } from 'react-hot-toast'; // Fixed: Use Toaster

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Redirect logged-in users to their dashboard
  if (user) {
    const dashboardPath = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    }[user.role];
    navigate(dashboardPath);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decoded = await login(formData.email, formData.password);
      toast.success('Logged in successfully!');
      const dashboardPath = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin/dashboard',
      }[decoded.role];
      navigate(dashboardPath);
    } catch (error) {
      setError(error.message || 'Invalid email or password');
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center flex-grow p-6">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Login to Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white transition duration-300 bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register-student" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} /> {/* Fixed: Use Toaster */}
    </div>
  );
}

export default Login;