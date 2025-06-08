// src/pages/admin/RegisterUsers.jsx
import React, { useState, useEffect } from 'react';
import { registerUser, getDepartments } from '../../services/api';
import toast from 'react-hot-toast';

function RegisterUsers() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    id_number: '',
    first_name: '',
    last_name: '',
    phone: '',
    department_id: '',
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        toast.error('Error fetching departments: ' + error.message);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Strict client-side validation
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Invalid email address');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.role === 'student') {
      if (!formData.id_number || !/^ETS\d{4}\/\d{2}$/.test(formData.id_number)) {
        toast.error('Invalid ID number format. Must be ETS{4 digits}/{2 digits}');
        return;
      }
    }
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error('First name and last name are required');
      return;
    }

    try {
      console.log('Sending register data:', formData); // Log sent data
      const dataToSend = formData.role === 'student'
        ? { ...formData, department_id: undefined } // Remove department_id for students
        : formData.role === 'instructor'
          ? { ...formData, id_number: undefined } // Remove id_number for instructors
          : formData; // Admin
      const response = await registerUser(dataToSend);
      toast.success(`${formData.role} registered successfully`);
      setFormData({
        email: '',
        password: '',
        role: 'student',
        id_number: '',
        first_name: '',
        last_name: '',
        phone: '',
        department_id: '',
      });
    } catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.errors?.[0]?.msg || error.message));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Register Users</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">Role</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {formData.role === 'student' && (
          <div>
            <label htmlFor="id_number" className="block text-sm font-medium">ID Number</label>
            <input
              type="text"
              id="id_number"
              value={formData.id_number}
              onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., ETS1234/12"
              required
            />
          </div>
        )}
        {formData.role === 'instructor' && (
          <div>
            <label htmlFor="department_id" className="block text-sm font-medium">Department</label>
            <select
              id="department_id"
              value={formData.department_id}
              onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select a department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name} ({dept.department_code})
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterUsers;