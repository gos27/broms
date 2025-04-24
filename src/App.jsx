// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import PublicDashboard from "./pages/Dashboard/PublicDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Home from "./pages/Home/Home";
import Academics from "./pages/Academics/Academics";
import Students from "./pages/Students/Students";
import Events from "./pages/Events/Events";
import About from "./pages/About";
import Contact from "./pages/Contact/Contact";
import ContactList from "./pages/Contact/ContactList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import AdminNavbar from "./components/AdminNavBar";

function App() {
  return (
    <AuthProvider>
      <div
        className="flex min-h-screen flex-col bg-blue-300" // Set background color for the entire page
        aria-live="polite"
      >
        <div className="mx-auto flex min-h-screen max-w-[800px] flex-col">
          {/* Navbar */}
          <Navbar />
          <AdminNavbar />
          <main className="mx-auto w-full max-w-[700px] flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/events" element={<Events />} />
              <Route path="/students" element={<Students />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact-list" element={<ContactList />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <PublicDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored" // You can use 'light', 'dark', or 'colored'
            />
          </main>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
