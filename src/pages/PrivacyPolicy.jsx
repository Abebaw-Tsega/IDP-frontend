// src/pages/PrivacyPolicy.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 text-center max-w-2xl">
          We value your privacy. We never share your personal information with third parties.
          <br />
          Your data is safe and secure on our platform.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;