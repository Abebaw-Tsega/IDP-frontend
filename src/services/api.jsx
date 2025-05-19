// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (data) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};


export const registerUser = async (data) => {
  try {
    const response = await api.post(`/register/${data.role}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

export const getUsers = async () => {
  const response = await api.get('/users/list');
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const getInstructors = async () => {
  const response = await api.get('/users/list?role=instructor');
  return response.data;
};

export const createDepartment = async (data) => {
  const response = await api.post('/departments', data);
  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get('/departments/');
  return response.data;
};

export const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};

export const createCourse = async (data) => {
  const response = await api.post('/courses', data);
  return response.data;
};

export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await api.put(`/courses/${id}`, data);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const createCourseAssignment = async (data) => {
  const response = await api.post('/course-assignments', data);
  return response.data;
};

export const getCourseAssignments = async () => {
  const response = await api.get('/course-assignments');
  return response.data;
};

export const updateCourseAssignment = async (id, data) => {
  const response = await api.put(`/course-assignments/${id}`, data);
  return response.data;
};

export const deleteCourseAssignment = async (id) => {
  const response = await api.delete(`/course-assignments/${id}`);
  return response.data;
};

export const getEnrollments = async () => {
  const response = await api.get('/enrollments');
  return response.data;
};

export const createEnrollment = async (data) => {
  const response = await api.post('/enrollments', data);
  return response.data;
};

export const updateEnrollment = async (id, data) => {
  const response = await api.put(`/enrollments/${id}`, data);
  return response.data;
};

export const deleteEnrollment = async (id) => {
  const response = await api.delete(`/enrollments/${id}`);
  return response.data;
};