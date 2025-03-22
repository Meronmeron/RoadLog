import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="top-nav">
        <div className="logo">TripLogger</div>
        <div className="nav-right">
          <button className="profile-btn">Profile</button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="main-content-wrapper">
        <aside className="sidebar">
          <Link to="/" className="sidebar-item">
            Dashboard
          </Link>
          <Link to="/new-trip" className="sidebar-item">
            New Trip
          </Link>
          <Link to="/logs" className="sidebar-item">
            Logs
          </Link>
          <Link to="/reports" className="sidebar-item">
            Reports
          </Link>
        </aside>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
