import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { gameStateReducer } from './slices/gameStateSlice';
import { boxSliceReducer } from './slices/boxSlice';
import { userReducer } from './slices/userSlice';
import { inventoryReducer, uiReducer } from './slices/inventorySlice';
import {userModeReducer} from './slices/userModeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gameState: gameStateReducer,
        boxState: boxSliceReducer,
        user: userReducer,
        inventory: inventoryReducer,
        userMode: userModeReducer,
    },
});