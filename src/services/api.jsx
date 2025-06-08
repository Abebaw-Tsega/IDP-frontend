// src/services/api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('No token for request:', config.url);
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    // console.log(`Response from ${response.config.url}:`, response.data); // Debug
    return response;
  },
  (error) => {
    console.error(`Error from ${error.config?.url}:`, error.response?.data || error.message); // Debug
    return Promise.reject(error);
  }
);

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
    console.log('Register user data:', data); // Log sent data
    const response = await api.post(`/register/${data.role}`, data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.errors?.[0]?.msg || error.response?.data?.error || 'Registration failed';
    throw new Error(errorMsg);
  }
};

export const getUsers = async () => {
  const response = await api.get('/users'); // Fixed endpoint
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
    const response = await api.get('/course-assignments/my-assignments');
    console.log('Course assignments response:', response.data); // Add this
    return response.data;
  
};

export const getAllCourseAssignments = async () => {
  const response = await api.get('/course-assignments'); // New endpoint for all assignments
  console.log('All course assignments response:', response.data); // Debug log
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

export const getStudentGrades = async () => {
  const response = await api.get('/student/grades');
  return response.data;
};



export const getEnrollmentsByCourse = async (courseId) => {
  const response = await api.get(`/enrollments/course/${courseId}`);
  return response.data;
};

export const getGradeByEnrollment = async (enrollmentId) => {
  const response = await api.get(`/grades/enrollment/${enrollmentId}`);
  return response.data;
};

export const submitGrade = async (enrollmentId, grade) => {
  const response = await api.post('/grades', { enrollmentId, grade });
  return response.data;
};