import React, { useState, useEffect } from 'react';
import './AdminUsers.css';
import { APIURL } from '../constant';

interface Admin {
  _id: string;
  email: string;
  password: string; // Including password for editing
}

const AdminUser: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newAdmin, setNewAdmin] = useState<Admin>({
    _id: '',
    email: '',
    password: '',
  });

  // Fetch Admin Data from API
  const fetchAdminData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/admin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch admin data: ${response.statusText}`);
      }

      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Error loading admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Delete Admin
  const handleDelete = async (_id: string): Promise<void> => {
    try {
      const response = await fetch(`${APIURL}/admin/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete admin: ${response.statusText}`);
      }

      setAdmins(admins.filter((admin) => admin._id !== _id));
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Error deleting admin');
    }
  };

  // Handle Edit Admin (Enable editing)
  const handleEdit = (admin: Admin): void => {
    setIsEditing(true);
    setCurrentAdmin(admin);
  };

  // Handle Update Admin (Update Email and Password)
  const handleUpdate = async (admin: Admin): Promise<void> => {
    try {
      const response = await fetch(`${APIURL}/admin/${admin._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(admin),
      });

      if (!response.ok) {
        throw new Error(`Failed to update admin: ${response.statusText}`);
      }

      setAdmins(admins.map((item) => (item._id === admin._id ? admin : item)));
      setIsEditing(false);
      setCurrentAdmin(null);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Error updating admin');
    }
  };

  // Handle Add Admin
  const handleAddAdmin = async (): Promise<void> => {
    try {
      const response = await fetch(`${APIURL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(newAdmin),
      });

      if (!response.ok) {
        throw new Error(`Failed to add new admin: ${response.statusText}`);
      }

      const data = await response.json();
      setAdmins([...admins, data]);
      setNewAdmin({ _id: '', email: '', password: '' });
      setIsAdding(false);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Error adding new admin');
    }
  };

  // Render the Edit Form
  const renderEditForm = () => {
    if (!currentAdmin) return null;

    return (
      <div className="edit-form">
        <h3>Edit Admin</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(currentAdmin);
          }}
        >
          <label>Email:</label>
          <input
            type="email"
            value={currentAdmin.email || ''}
            onChange={(e) =>
              setCurrentAdmin({ ...currentAdmin, email: e.target.value })
            }
          />
          <label>Password:</label>
          <input
            type="password"
            value={currentAdmin.password || ''}
            onChange={(e) =>
              setCurrentAdmin({ ...currentAdmin, password: e.target.value })
            }
            placeholder="Enter new password"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </div>
    );
  };

  // Render the Add Admin Form
  const renderAddAdminForm = () => (
    <div className="edit-form">
      <h3>Add New Admin</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAdmin();
        }}
      >
        <label>Email:</label>
        <input
          type="email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={newAdmin.password}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, password: e.target.value })
          }
          required
        />
        <button type="submit">Add Admin</button>
        <button type="button" onClick={() => setIsAdding(false)}>
          Cancel
        </button>
      </form>
    </div>
  );

  return (
    <div className="admin-user-container">
      <h2>Admin Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="split-container">
          {/* Left half for Add Form */}
          <div className="form-half">
            {isAdding && renderAddAdminForm()}
            {/* Render the "Add New Admin" button only if the form is not being displayed */}
            {!isAdding && <button onClick={() => setIsAdding(true)}>Add New Admin</button>}
          </div>

          {/* Right half for Admin Table */}
          <div className="table-half">
            {isEditing && renderEditForm()}

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin._id}</td>
                    <td>{admin.email}</td>
                    <td>
                      <button onClick={() => handleEdit(admin)}>Edit</button>
                      <button onClick={() => handleDelete(admin._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

};

export default AdminUser;
