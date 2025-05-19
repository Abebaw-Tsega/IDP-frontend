// src/pages/RegisterStudent.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser, getDepartments } from '../services/api.jsx';
import { Toaster, toast } from 'react-hot-toast'; // Fixed: Use Toaster
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function RegisterStudent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    id_number: '',
    email: '',
    phone_number: '',
    department_id: '',
    password: '',
    confirm_password: '',
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  // Redirect logged-in users to their dashboard
  useEffect(() => {
    if (user) {
      const dashboardPath = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin/dashboard',
      }[user.role];
      navigate(dashboardPath);
    }
  }, [user, navigate]);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch {
        setError('Failed to load departments');
        toast.error('Failed to load departments');
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError('');
  };

  const validateForm = () => {
    const {
      first_name,
      last_name,
      id_number,
      email,
      phone_number,
      department_id,
      password,
      confirm_password,
    } = formData;

    if (
      !first_name ||
      !last_name ||
      !id_number ||
      !email ||
      !phone_number ||
      !department_id ||
      !password ||
      !confirm_password
    ) {
      return 'All fields are required';
    }
    if (!/^[A-Za-z\s]+$/.test(first_name) || !/^[A-Za-z\s]+$/.test(last_name)) {
      return 'Name must contain only letters and spaces';
    }
    if (!/^ETS\d{4}\/\d{2}$/.test(id_number)) {
      return 'ID Number must be in the format ETSXXXX/XX (e.g., ETS0117/15)';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email format';
    }
    if (!/^\d{10}$/.test(phone_number)) {
      return 'Phone number must be exactly 10 digits';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (password !== confirm_password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      await registerUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        id_number: formData.id_number,
        email: formData.email,
        phone_number: formData.phone_number,
        department_id: parseInt(formData.department_id),
        password: formData.password,
        role: 'student',
      });
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center flex-grow p-6">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Register as a Student
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-700" htmlFor="first_name">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-700" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="id_number">
                ID Number
              </label>
              <input
                type="text"
                id="id_number"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error.includes('ID Number') ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="e.g., ETS0117/15"
                value={formData.id_number}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error.includes('email') ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="phone_number">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error.includes('Phone number') ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="Enter 10-digit phone number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="department_id">
                Department
              </label>
              <select
                id="department_id"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
                value={formData.department_id}
                onChange={handleChange}
                required
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>
                    {dept.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error.includes('Password') ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${error.includes('Passwords') ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white transition duration-300 bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} /> {/* Fixed: Use Toaster */}
    </div>
  );
}

export default RegisterStudent;