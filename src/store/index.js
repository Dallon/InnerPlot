import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import userProfileSlice from './slices/userProfileSlice';
import gardenStateSlice from './slices/gardenStateSlice';
import marketplaceSlice from './slices/marketplaceSlice';
import tasksSlice from './slices/tasksSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // userProfile: userProfileSlice.reducer,
        // gardenState: gardenStateSlice.reducer,
        // marketplace: marketplaceSlice.reducer,
        // tasks: tasksSlice.reducer,
    },
});