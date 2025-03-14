import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';
import AdminLayout from './layout/AdminLayout';
import AdminUser from './pages/AdminUsers';
import AdminCouponManagement from './pages/AdminCouponManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout/>}> 
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUser />} />
          <Route path="/admin/coupons" element={<AdminCouponManagement />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
