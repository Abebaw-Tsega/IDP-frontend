// src/components/CourseCard.jsx
import React from 'react';

function CourseCard({ enrollment, onDrop }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{enrollment.course_name}</h3>
      <p className="text-gray-600">Code: {enrollment.course_code}</p>
      <p className="text-gray-600">Status: {enrollment.status}</p>
      <p className="text-gray-600">Grade: {enrollment.grade || 'N/A'}</p>
      {enrollment.status === 'enrolled' && (
        <button
          onClick={() => onDrop(enrollment.enrollment_id)}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Drop Course
        </button>
      )}
    </div>
  );
}

export default CourseCard;