import React from "react";
import { useAuth } from "../../context/AuthContext";

const PublicDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4">
      <h1 className="text-lg font-bold text-blue-700">Brom's Academy</h1>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm">{user.email}</span>}
        {user && (
          <button
            onClick={logout}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicDashboard;
