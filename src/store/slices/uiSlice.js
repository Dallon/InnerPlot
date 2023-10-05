// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isInventoryOpen: false,
  },
  reducers: {
    toggleInventory: (state) => {
      state.isInventoryOpen = !state.isInventoryOpen;
      console.log(state.isInventoryOpen + "<--inventory state");
    },
  },
});

export const { toggleInventory } = uiSlice.actions;
export  const uiReducer= uiSlice.reducer;