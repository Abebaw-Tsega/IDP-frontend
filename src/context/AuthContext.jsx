// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      console.log('Attempting login with:', { email }); // Debug
      const response = await loginUser({ email, password });
      console.log('Login response:', JSON.stringify(response, null, 2)); // Debug
      const { token, role } = response;
      if (!token) {
        throw new Error('No token in response');
      }
      if (!role) {
        throw new Error('No role in response');
      }
      // Create userData from response and decoded token
      const decoded = jwtDecode(token);
      const userData = {
        user_id: decoded.user_id,
        first_name: decoded.first_name,
        role: role || decoded.role, // Use response role or fallback to decoded
      };
      localStorage.setItem('token', token);
      console.log('Token stored:', localStorage.getItem('token')); // Debug
      setUser(userData);
      console.log('Decoded token:', decoded); // Debug
      // Navigate based on role
      const dashboardPath = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin/dashboard',
      }[userData.role];
      if (!dashboardPath) {
        throw new Error('Invalid role: ' + userData.role);
      }
      navigate(dashboardPath, { replace: true });
      return decoded; // For Login.jsx
    } catch (error) {
      console.error('Login error:', error.message, error.response?.data); // Debug
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out, current user:', user); // Debug
      localStorage.removeItem('token');
      console.log('Token after logout:', localStorage.getItem('token')); // Debug
      setUser(null);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error); // Debug
      throw new Error('Logout failed');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        console.log('Found token on mount:', token.substring(0, 20) + '...'); // Debug
        const decoded = jwtDecode(token);
        const userData = {
          user_id: decoded.user_id,
          first_name: decoded.first_name,
          role: decoded.role,
        };
        setUser(userData);
        // Redirect to dashboard if on login/register page
        if (['/login', '/register-student'].includes(window.location.pathname)) {
          const dashboardPath = {
            student: '/student/dashboard',
            instructor: '/instructor/dashboard',
            admin: '/admin/dashboard',
          }[userData.role];
          if (dashboardPath) {
            navigate(dashboardPath, { replace: true });
          }
        }
      } catch (error) {
        console.error('Token decode error:', error); // Debug
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);