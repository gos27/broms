import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import broms from "../assets/broms.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-200 font-bold"
      : "hover:text-indigo-200 hover:blue-900 hover:underline";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const GeneralLinks = () => (
    <>
      <Link to="/" className={isActive("/")}>
        Home
      </Link>
      <Link to="/about" className={isActive("/about")}>
        About
      </Link>
      <Link to="/contact" className={isActive("/contact")}>
        Contact
      </Link>
      <Link to="/auth" className={isActive("/auth")}>
        Login
      </Link>
    </>
  );

  const AdminLinks = () => (
    <>
      <Link to="/dashboard" className={isActive("/dashboard")}>
        Admin
      </Link>
      <Link to="/students" className={isActive("/students")}>
        Students
      </Link>
      <Link to="/events" className={isActive("/events")}>
        Events
      </Link>
      <Link to="/contact-list" className={isActive("/contact-list")}>
        Contact-List
      </Link>
      <button onClick={logout} className="hover:text-red-300">
        Logout
      </button>
    </>
  );

  return (
    <nav className="flex items-center justify-between bg-blue-900 p-4 text-white shadow-md">
      <Link to="/" className="w-80">
        <img src={broms} width="40" />
      </Link>

      <div className="hidden space-x-6 md:flex">
        {isAdmin ? <AdminLinks /> : <GeneralLinks />}
      </div>

      <div className="flex items-center md:hidden">
        <button onClick={toggleMenu} className="text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transform bg-black bg-opacity-50 transition-all duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 flex transform items-center justify-center bg-blue-900 transition-all duration-500 ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="space-y-6 text-center text-white">
          <button
            className="absolute right-4 top-4 text-2xl text-white"
            onClick={toggleMenu}
          >
            &times;
          </button>

          {isAdmin ? (
            <>
              <Link
                to="/dashboard"
                className={`block py-2 ${isActive("/dashboard")}`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/students"
                className={`block py-2 ${isActive("/students")}`}
                onClick={toggleMenu}
              >
                Students
              </Link>
              <Link
                to="/events"
                className={`block py-2 ${isActive("/events")}`}
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link
                to="/contact-list"
                className={`block py-2 ${isActive("/contact-list")}`}
                onClick={toggleMenu}
              >
                Contact-List
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block py-2 text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={`block py-2 ${isActive("/")}`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block py-2 ${isActive("/about")}`}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`block py-2 ${isActive("/contact")}`}
                onClick={toggleMenu}
              >
                Contact
              </Link>

              {!user ? (
                <Link
                  to="/auth"
                  className={`block py-2 ${isActive("/auth")}`}
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block py-2 text-red-300"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
