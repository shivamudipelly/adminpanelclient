import React from 'react';
import { Outlet } from 'react-router-dom'; // To render child routes
import AdminNavbar from '../components/AdminNavbar';
import './AdminLayout.css'; // Layout-specific CSS

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      {/* Admin Navbar */}
      <div>
        <AdminNavbar />
      </div>

      {/* Router Outlet: Child routes will be displayed here */}
      <div className="admin-content">
        <Outlet /> {/* This will render the specific page content based on the route */}
      </div>
    </div>
  );
};

export default AdminLayout;
