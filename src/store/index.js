import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { gameStateReducer } from './slices/gameStateSlice';
import { boxSliceReducer } from './slices/boxSlice';
// import userProfileSlice from './slices/userProfileSlice';
// import gardenStateSlice from './slices/gardenStateSlice';
// import tasksSlice from './slices/tasksSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gameState: gameStateReducer,
        boxState: boxSliceReducer,

        // userProfile: userProfileSlice.reducer,
        // gardenState: gardenStateSlice.reducer,
        // tasks: tasksSlice.reducer,
    },
});