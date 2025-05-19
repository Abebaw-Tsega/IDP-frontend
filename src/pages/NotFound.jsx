// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default NotFound;