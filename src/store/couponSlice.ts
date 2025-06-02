
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Coupon {
  code: string;
  discount: number; // percentage
  description: string;
}

interface CouponState {
  appliedCoupon: Coupon | null;
  availableCoupons: Coupon[];
}

const initialState: CouponState = {
  appliedCoupon: null,
  availableCoupons: [
    { code: 'ABC123', discount: 20, description: '20% off on all items' },
    { code: 'SAVE10', discount: 10, description: '10% discount' },
    { code: 'WELCOME15', discount: 15, description: '15% welcome discount' },
    { code: 'FESTIVE25', discount: 25, description: '25% festive special' },
    { code: 'FIRST5', discount: 5, description: '5% first order discount' }
  ]
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon: (state, action: PayloadAction<string>) => {
      const couponCode = action.payload.toUpperCase();
      const coupon = state.availableCoupons.find(c => c.code === couponCode);
      if (coupon) {
        state.appliedCoupon = coupon;
      }
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
    }
  }
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
