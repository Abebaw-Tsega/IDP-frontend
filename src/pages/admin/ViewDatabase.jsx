// src/pages/admin/ViewDatabase.jsx
import React, { useState, useEffect } from 'react';
import {
  getUsers, updateUser, deleteUser,
  getDepartments, updateDepartment, deleteDepartment,
  getCourses, updateCourse, deleteCourse,
  getEnrollments, updateEnrollment, deleteEnrollment,
  getAllCourseAssignments, updateCourseAssignment, deleteCourseAssignment
} from '../../services/api';
import toast from 'react-hot-toast';

function ViewDatabase() {
  const [data, setData] = useState({
    users: [], departments: [], courses: [], enrollments: [], courseAssignments: [],
  });
  const [activeTab, setActiveTab] = useState('users');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, departments, courses, enrollments, courseAssignments] = await Promise.all([
          getUsers(), getDepartments(), getCourses(), getEnrollments(), getAllCourseAssignments(),
        ]);
        console.log('Course Assignments Data:', courseAssignments); // Debug log
        setData({ users, departments, courses, enrollments, courseAssignments });
      } catch (error) {
        toast.error('Error fetching database: ' + error.message);
      }
    };
    fetchData();
  }, []);

  const toEthiopianCalendar = (gregorianDate) => {
    if (!gregorianDate) return 'N/A';
    const date = new Date(gregorianDate);
    const gcYear = date.getFullYear();
    const gcMonth = date.getMonth() + 1;
    const gcDay = date.getDate();
    let ecYear = gcYear - 8;
    let ecMonth = gcMonth;
    let ecDay = gcDay;
    if (gcMonth === 9 && gcDay > 10) {
      ecMonth = 13;
      ecDay = gcDay - 10;
    } else if (gcMonth === 9 && gcDay <= 10) {
      ecMonth = 1;
      ecDay = gcDay + 20;
    }
    return `${ecDay}/${ecMonth}/${ecYear}`;
  };

  const handleUpdate = async (tabId, item) => {
    try {
      const updateData = { ...editItem };
      switch (tabId) {
        case 'users':
          await updateUser(item.user_id, updateData);
          break;
        case 'departments':
          await updateDepartment(item.department_id, updateData);
          break;
        case 'courses':
          await updateCourse(item.course_id, updateData);
          break;
        case 'enrollments':
          await updateEnrollment(item.enrollment_id, updateData);
          break;
        case 'courseAssignments':
          await updateCourseAssignment(item.assignment_id, updateData);
          break;
      }
      toast.success(`${tabId} updated successfully`);
      setEditItem(null);
      const [users, departments, courses, enrollments, courseAssignments] = await Promise.all([
        getUsers(), getDepartments(), getCourses(), getEnrollments(), getAllCourseAssignments(),
      ]);
      setData({ users, departments, courses, enrollments, courseAssignments });
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
    }
  };

  const handleDelete = async (tabId, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${tabId.slice(0, -1)}?`)) return;
    try {
      switch (tabId) {
        case 'users':
          await deleteUser(id);
          break;
        case 'departments':
          await deleteDepartment(id);
          break;
        case 'courses':
          await deleteCourse(id);
          break;
        case 'enrollments':
          await deleteEnrollment(id);
          break;
        case 'courseAssignments':
          await deleteCourseAssignment(id);
          break;
      }
      toast.success(`${tabId} deleted successfully`);
      const [users, departments, courses, enrollments, courseAssignments] = await Promise.all([
        getUsers(), getDepartments(), getCourses(), getEnrollments(), getAllCourseAssignments(),
      ]);
      setData({ users, departments, courses, enrollments, courseAssignments });
    } catch (error) {
      toast.error(`Delete failed: ${error.message}`);
    }
  };

  const renderEditForm = (tabId, item) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Edit {tabId.slice(0, -1)}</h3>
        {Object.keys(editItem).map(key => (
          key !== 'user_id' && key !== 'department_id' && key !== 'course_id' && key !== 'enrollment_id' && key !== 'assignment_id' && (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium">{key.replace('_', ' ')}</label>
              <input
                type={key === 'credits' ? 'number' : 'text'}
                value={editItem[key] || ''}
                onChange={(e) => setEditItem({ ...editItem, [key]: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          )
        ))}
        <div className="flex space-x-4">
          <button
            onClick={() => handleUpdate(tabId, item)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditItem(null)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderTable = (items, columns, tabId) => (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} className="py-2 px-4 border">{col.label}</th>
          ))}
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id || item.enrollment_id || item.assignment_id || index}>
            {columns.map(col => (
              <td key={col.key} className={`py-2 px-4 border ${col.className ? col.className(item) : ''}`}>
                {col.render ? col.render(item) : item[col.key] || 'N/A'}
              </td>
            ))}
            <td className="py-2 px-4 border">
              <button
                onClick={() => setEditItem({ ...item })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tabId, item.user_id || item.department_id || item.course_id || item.enrollment_id || item.assignment_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const tabs = [
    {
      id: 'users',
      label: 'Users',
      data: data.users,
      columns: [
        { key: 'user_id', label: 'ID' },
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        {
          key: 'role',
          label: 'Role',
          className: (item) => ({
            student: 'text-blue-600',
            instructor: 'text-green-600',
            admin: 'text-red-600',
          }[item.role] || ''),
        },
      ],
    },
    {
      id: 'departments',
      label: 'Departments',
      data: data.departments,
      columns: [
        { key: 'department_id', label: 'ID' },
        { key: 'department_name', label: 'Name' },
        { key: 'department_code', label: 'Code' },
      ],
    },
    {
      id: 'courses',
      label: 'Courses',
      data: data.courses,
      columns: [
        { key: 'course_id', label: 'ID' },
        { key: 'course_name', label: 'Name' },
        { key: 'course_code', label: 'Code' },
        { key: 'department_name', label: 'Department' },
        { key: 'credits', label: 'Credits' },
      ],
    },
    {
      id: 'enrollments',
      label: 'Enrollments',
      data: data.enrollments,
      columns: [
        { key: 'enrollment_id', label: 'ID' },
        { key: 'student_name', label: 'Student' },
        { key: 'course_name', label: 'Course' },
        {
          key: 'enrollment_date',
          label: 'Date (EC)',
          render: (item) => toEthiopianCalendar(item.enrollment_date),
        },
        {
          key: 'status',
          label: 'Status',
          className: (item) => ({
            enrolled: 'text-green-600',
            completed: 'text-blue-600',
            dropped: 'text-red-600',
          }[item.status] || ''),
        },
        { key: 'grade', label: 'Grade' },
      ],
    },
    {
      id: 'courseAssignments',
      label: 'Course Assignments',
      data: data.courseAssignments,
      columns: [
        { key: 'assignment_id', label: 'ID' },
        {
          key: 'instructor_name',
          label: 'Instructor',
          render: (item) => item.instructor_name ? `${item.instructor_name} ${item.instructor_last_name || ''}`.trim() : 'N/A'
        },
        { key: 'course_name', label: 'Course' },
        {
          key: 'created_at',
          label: 'Created At (EC)',
          render: (item) => toEthiopianCalendar(item.created_at),
        },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">View Database</h1>
      <div className="flex space-x-4 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map(tab => (
        activeTab === tab.id && (
          <div key={tab.id}>
            <h2 className="text-xl font-semibold mb-4">{tab.label}</h2>
            {tab.data.length === 0 ? (
              <p className="text-gray-600">No {tab.label.toLowerCase()} found.</p>
            ) : (
              renderTable(tab.data, tab.columns, tab.id)
            )}
            {editItem && renderEditForm(tab.id, editItem)}
          </div>
        )
      ))}
    </div>
  );
}

export default ViewDatabase;