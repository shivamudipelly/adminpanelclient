import React, { useState, useEffect } from 'react';
import './AdminCouponManagement.css';
import { APIURL } from '../constant';

interface Coupon {
    _id: string;
    code: string;
    isClaimed: boolean;
    createdAt: string;
    claimedBy: string | null;
}

const AdminCouponManagement: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [newCoupon, setNewCoupon] = useState<string>('');

    // Fetch Coupons Data
    const fetchCouponsData = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(`${APIURL}/admin/coupons`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('adminToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch coupon data');
            }

            const data = await response.json();
            setCoupons(data);
        } catch (error) {
            setError('Error loading coupon data');
        } finally {
            setLoading(false);
        }
    };

    // Add New Coupon
    const handleAddCoupon = async (): Promise<void> => {
        try {
            const response = await fetch(`${APIURL}/admin/add-coupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ code: newCoupon }),
            });

            if (!response.ok) {
                throw new Error('Failed to add coupon');
            }

            fetchCouponsData();
            setNewCoupon('');
        } catch (error) {
            setError('Error adding coupon');
        }
    };

    // Toggle Coupon Claim Status
    const handleToggleClaimStatus = async (couponId: string, currentStatus: boolean): Promise<void> => {
        try {
            const response = await fetch(`${APIURL}/coupons/${couponId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ isClaimed: !currentStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update coupon claim status');
            }

            fetchCouponsData();
        } catch (error) {
            setError('Error updating coupon claim status');
        }
    };

    useEffect(() => {
        fetchCouponsData();
    }, []);

    return (
        <div className="coupon-management-container">
            <div className="coupon-management">
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div>
                        <div className="add-coupon-section">
                            <input
                                type="text"
                                className="coupon-input"
                                placeholder="Enter New Coupon Code"
                                value={newCoupon}
                                onChange={(e) => setNewCoupon(e.target.value)}
                            />
                            <button className="add-button" onClick={handleAddCoupon}>Add Coupon</button>
                        </div>

                        <table className="coupon-table">
                            <thead>
                                <tr>
                                    <th>Coupon Code</th>
                                    <th>Status</th>
                                    <th>Claimed By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon._id}>
                                        <td>{coupon.code}</td>
                                        <td>{coupon.isClaimed ? 'Claimed' : 'Available'}</td>
                                        <td>{coupon.claimedBy || 'N/A'}</td>
                                        <td>
                                            <button
                                                className={`toggle-btn ${coupon.isClaimed ? 'inactive' : 'active'}`}
                                                onClick={() => handleToggleClaimStatus(coupon._id, coupon.isClaimed)}
                                            >
                                                {coupon.isClaimed ? 'Mark as Available' : 'Mark as Claimed'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCouponManagement;
