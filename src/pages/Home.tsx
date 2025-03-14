import React, { useState } from "react";
import "./styles.css";  // Ensure styles.css is imported
import { APIURL } from "../constant";

interface Coupon {
  code: string;
}

const Home: React.FC = () => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // New state to show loading spinner

  const claimCoupon = async () => {
    setLoading(true); // Set loading to true when starting the request
    try {
      const response = await fetch(`${APIURL}/coupons/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setCoupon(data.coupon);
        setMessage("Coupon claimed successfully!");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Error claiming coupon.");
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };

  // Check if user is logged in (token exists in localStorage)
  const isLoggedIn = Boolean(localStorage.getItem("adminToken"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setMessage("Logged out successfully.");
  };

  return (
    <div className="container">
      {/* Small Navbar inside the Home component */}
      <div className="navbar">
        <ul className="navbar-links">
          <li className="navbar-item">
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            {isLoggedIn ? (
              <>
                <a href="/admin/dashboard" className="navbar-link dashboard-btn">
                  Dashboard
                </a>
                <button className="navbar-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <a href="/admin/login" className="navbar-link login-btn">
                Login
              </a>
            )}
          </li>
        </ul>
      </div>

      <h1>Claim Your Coupon</h1>

      {/* Coupon display */}
      {coupon ? (
        <div className="coupon-container">
          <p className="coupon-text">
            Your Coupon: <span className="coupon-code">{coupon.code}</span>
          </p>
        </div>
      ) : (
        <button
          onClick={claimCoupon}
          className="claim-btn"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Claiming..." : "Claim Coupon"}
        </button>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Home;
