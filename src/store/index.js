import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { gameStateReducer } from './slices/gameStateSlice';
import userProfileSlice from './slices/userProfileSlice';
import gardenStateSlice from './slices/gardenStateSlice';
import tasksSlice from './slices/tasksSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gameState: gameStateReducer,
        // userProfile: userProfileSlice.reducer,
        // gardenState: gardenStateSlice.reducer,
        // tasks: tasksSlice.reducer,
    },
});