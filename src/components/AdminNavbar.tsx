import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.css'; // Import your plain CSS file

const AdminNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (): void => {
    localStorage.removeItem('adminToken');
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-layout">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="navbar-container">
          <h2 className="navbar-brand">Admin Dashboard</h2>

          {/* Hamburger Icon for Mobile */}
          <button
            className="hamburger-icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Navbar Links */}
          <nav className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/coupons"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Coupons
                </NavLink>
              </li>
              <li className="logout">
                <Link to="/" onClick={handleLogout}>
                  <i className="fa fa-sign-out-alt"></i> Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
