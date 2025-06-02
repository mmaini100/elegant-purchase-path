
import React, { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { applyCoupon, removeCoupon } from '../store/couponSlice';

const CouponInput = () => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const { appliedCoupon, availableCoupons } = useAppSelector(state => state.coupon);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      dispatch(applyCoupon(couponCode));
      setError('');
      setCouponCode('');
    } else {
      setError('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  return (
    <div className="space-y-4">
      {!appliedCoupon ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coupon Code
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="text-green-600" size={16} />
              <span className="font-medium text-green-800">{appliedCoupon.code}</span>
              <span className="text-green-600 text-sm">({appliedCoupon.discount}% off)</span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-800"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-green-700 text-sm mt-1">{appliedCoupon.description}</p>
        </div>
      )}
      
      <div className="text-xs text-gray-500">
        <p className="font-medium mb-1">Available coupons:</p>
        <div className="space-y-1">
          {availableCoupons.map((coupon) => (
            <p key={coupon.code}>
              <span className="font-mono">{coupon.code}</span> - {coupon.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponInput;
