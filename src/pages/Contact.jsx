// src/pages/Contact.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Contact Us</h1>
        <p className="text-gray-700 text-center max-w-2xl">
          📧 Email: support@universityportal.com
          <br />
          📞 Phone: +2519876543210

          <br />
          🏢 Address: Addis Ababa, Ethiopia
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;