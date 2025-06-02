
import { configureStore } from '@reduxjs/toolkit';
import couponReducer from './couponSlice';

export const store = configureStore({
  reducer: {
    coupon: couponReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
