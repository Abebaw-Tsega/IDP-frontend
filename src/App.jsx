// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RegisterStudent from './pages/RegisterStudent';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import Enroll from './pages/student/Enroll';
import GradesPage from './pages/student/GradesPage'; // New
import InstructorDashboard from './pages/instructor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import RegisterUsers from './pages/admin/RegisterUsers';
import CreateDepartment from './pages/admin/CreateDepartment';
import CreateCourse from './pages/admin/CreateCourse';
import AssignInstructor from './pages/admin/AssignInstructor';
import ViewDatabase from './pages/admin/ViewDatabase';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/not-found" />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    const dashboardPath = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    }[user.role];
    return <Navigate to={dashboardPath} />;
  }
  return children;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register-student"
          element={
            <PublicRoute>
              <RegisterStudent />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/not-found" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <StudentDashboard />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/enroll"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <Enroll />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grades"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <GradesPage />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <InstructorDashboard />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <AdminDashboard />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/register-users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <RegisterUsers />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-department"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <CreateDepartment />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <CreateCourse />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assign-instructor"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <AssignInstructor />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-database"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6">
                    <ViewDatabase />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;