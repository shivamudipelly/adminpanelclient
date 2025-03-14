import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Custom CSS file import
import { APIURL } from '../constant';

interface DashboardData {
    totalCoupons: number;
    totalAdmins: number;
    activeCoupons: number;
    latestActivity: {
        code: string;
        isClaimed: boolean;
        claimedBy: string;
        createdAt: string; // Use string or Date depending on how you want to handle it
        claimedAt: string | null; // Can be null if not claimed
    }[];
}

const AdminDashboard: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        totalCoupons: 0,
        totalAdmins: 0,
        activeCoupons: 0,
        latestActivity: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Fetch Dashboard Data
    const fetchDashboardData = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(`${APIURL}/admin/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('adminToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data: DashboardData = await response.json();
            setDashboardData(data);
        } catch (error) {
            setError('Error loading dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div>
            <div className="overview">
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="cards">
                        <div className="card">
                            <h3>Total Coupons</h3>
                            <p>{dashboardData.totalCoupons}</p>
                        </div>
                        <div className="card">
                            <h3>Total Admins</h3>
                            <p>{dashboardData.totalAdmins}</p>
                        </div>
                        <div className="card">
                            <h3>Active Coupons</h3>
                            <p>{dashboardData.activeCoupons}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Latest Activity */}
            <div className="latest-activity">
                <h3>Latest Activity</h3>
                {dashboardData.latestActivity.length > 0 ? (
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>Coupon Code</th>
                                <th>Claimed</th>
                                <th>Claimed By</th>
                                <th>Created At</th>
                                <th>Claimed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.latestActivity.map((activity, index) => (
                                <tr key={index}>
                                    <td>{activity.code}</td>
                                    <td>{activity.isClaimed ? 'Yes' : 'No'}</td>
                                    <td>{activity.claimedBy}</td>
                                    <td>{new Date(activity.createdAt).toLocaleString()}</td> {/* Formatting Date */}
                                    <td>{activity.claimedAt ? new Date(activity.claimedAt).toLocaleString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No recent activity.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
