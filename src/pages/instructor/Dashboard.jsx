// src/pages/instructor/Dashboard.jsx
import React from 'react';

function InstructorDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold text-center text-green-700">
        Instructor Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 transition bg-white shadow-md rounded-2xl hover:shadow-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">My Courses</h2>
          <p className="text-gray-600">View the courses you teach.</p>
        </div>

        <div className="p-6 transition bg-white shadow-md rounded-2xl hover:shadow-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Grades</h2>
          <p className="text-gray-600">Submit student grades securely.</p>
        </div>

        <div className="p-6 transition bg-white shadow-md rounded-2xl hover:shadow-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Manage Students</h2>
          <p className="text-gray-600">Track student performance and attendance.</p>
        </div>

        <div className="p-6 transition bg-white shadow-md rounded-2xl hover:shadow-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Announcements</h2>
          <p className="text-gray-600">Post class updates and news.</p>
        </div>

        {/* <div className="p-6 transition bg-white shadow-md rounded-2xl hover:shadow-xl">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Profile</h2>
          <p className="text-gray-600">Update your information and credentials.</p>
        </div> */}
      </div>
    </div>

  );
}

export default InstructorDashboard;