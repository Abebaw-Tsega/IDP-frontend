// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  const socialMedia = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      iconPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      iconPath: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      iconPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
    }
  ];

  return (
    <footer className="py-10 text-white bg-blue-700 mt-auto">
      <div className="container px-4 py-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* University Info */}
          <div>
            <h3 className="mb-2 font-bold text-md">UniversitySys</h3>
            <p className="text-xs opacity-90">
              Empowering education through innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link to="/register-student" className="hover:text-gray-300">Admissions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Contact Us</h4>
            <ul className="space-y-1 text-xs opacity-90">
              <li><a href="mailto:support@universitysys.edu" className="hover:text-gray-300">support@universitysys.edu</a></li>
              <li><a href="tel:5551234567" className="hover:text-gray-300">+251 960737167</a></li>
              <li>Ethiopia</li>
              <li>Academic City, AA 1000</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Connect</h4>
            <div className="flex space-x-2">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.iconPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-3 mt-3 text-xs text-center border-t border-blue-600">
          <p>© {currentYear} UniversityMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;