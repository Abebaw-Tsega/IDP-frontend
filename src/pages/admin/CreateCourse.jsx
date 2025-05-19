// src/pages/admin/CreateCourse.jsx
import React, { useState, useEffect } from 'react';
import { createCourse, getDepartments } from '../../services/api';
import toast from 'react-hot-toast';

function CreateCourse() {
  const [formData, setFormData] = useState({
    course_name: '',
    course_code: '',
    department_id: '',
    credits: '',
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
    try {
      await createCourse({ ...formData, credits: parseInt(formData.credits) });
      toast.success('Course created successfully');
      setFormData({ course_name: '', course_code: '', department_id: '', credits: '' });
    } catch (error) {
      toast.error('Failed to create course: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="course_name" className="block text-sm font-medium">Course Name</label>
          <input
            type="text"
            id="course_name"
            value={formData.course_name}
            onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="course_code" className="block text-sm font-medium">Course Code</label>
          <input
            type="text"
            id="course_code"
            value={formData.course_code}
            onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
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
        <div>
          <label htmlFor="credits" className="block text-sm font-medium">Credits</label>
          <input
            type="number"
            id="credits"
            value={formData.credits}
            onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;