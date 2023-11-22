import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { itemStateReducer } from './slices/itemsSlice';
import { userReducer } from './slices/userSlice';
import { inventoryReducer } from './slices/inventorySlice';
import { spriteStateReducer } from './slices/spritesSlice';
import { gridCellReducer } from './slices/gridCellSlice';
import { playerReducer } from './slices/playerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        itemState: itemStateReducer,
        spriteState: spriteStateReducer,
        user: userReducer,
        inventory: inventoryReducer,
        gridCells: gridCellReducer,
        player: playerReducer,
    },

});