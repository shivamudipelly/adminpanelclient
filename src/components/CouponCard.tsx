// CouponCard.tsx
import React from "react";

interface Coupon {
    code: string;
    description: string; // You can add more properties here as needed
}

interface CouponCardProps {
    coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
    return (
        <div className="coupon-card">
            <h3 className="coupon-title">Coupon Code: {coupon.code}</h3>
            <p className="coupon-description">{coupon.description}</p>
        </div>
    );
};

export default CouponCard;
