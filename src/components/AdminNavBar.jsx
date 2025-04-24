import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Container, Paper } from "@mui/material";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user || user.role !== "admin") return null;

  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-400 font-bold"
      : "hover:text-yellow-400";

  return (
    <>
      <Container>
        <div className="flex items-center justify-between bg-gray-800 p-4 text-white shadow">
          <div className="flex items-center justify-between space-x-4 text-sm">
           
            <Link to="/students" className={isActive("/students")}>
              Students
            </Link>
            <Link to="/events" className={isActive("/events")}>
              Events
            </Link>
            <Link to="/contact-list" className={isActive("/contact-list")}>
              Contact
            </Link>

            {/* Styled email display */}
            <span className="rounded bg-gray-700 px-3 py-1 text-xs font-medium text-yellow-300">
              {user.email}
            </span>
          </div>
          <div>
            <button
              onClick={logout}
              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminNavbar;
