// src/pages/admin/CreateDepartment.jsx
import React, { useState } from 'react';
import { createDepartment } from '../../services/api';
import toast from 'react-hot-toast';

function CreateDepartment() {
  const [formData, setFormData] = useState({
    department_name: '',
    department_code: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(formData);
      toast.success('Department created successfully');
      setFormData({ department_name: '', department_code: '' });
    } catch (error) {
      toast.error('Failed to create department: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Department</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="department_name" className="block text-sm font-medium">Department Name</label>
          <input
            type="text"
            id="department_name"
            value={formData.department_name}
            onChange={(e) => setFormData({ ...formData, department_name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="department_code" className="block text-sm font-medium">Department Code</label>
          <input
            type="text"
            id="department_code"
            value={formData.department_code}
            onChange={(e) => setFormData({ ...formData, department_code: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Department
        </button>
      </form>
    </div>
  );
}

export default CreateDepartment;