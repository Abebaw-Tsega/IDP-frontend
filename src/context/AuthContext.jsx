// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../services/api.jsx';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  // Initialize user from stored token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          user_id: decoded.user_id,
          role: decoded.role,
          first_name: decoded.first_name,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { token } = response;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser({
        user_id: decoded.user_id,
        role: decoded.role,
        first_name: decoded.first_name,
      });
      return decoded;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};