// inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
    byId: {},
    allIds: [],

    isInventoryOpen: false,
  };

export const inventorySlice = createSlice({
  name: 'inventory',
 
  initialState,
  reducers: {
    addInventoryItem: (state, action) => {
      const newItem = action.payload;
      state.inventory.byId[newItem.id] = newItem;
      state.inventory.allIds.push(newItem.id);
    },
    removeInventoryItem: (state, action) => {
      const idToRemove = action.payload;
    
      //filter out the id from allIds array
      state.allIds = state.allIds.filter(id => id !== idToRemove);

      delete state.byId[idToRemove];
    },

    toggleInventory: (state) => {
      state.isInventoryOpen = !state.isInventoryOpen;
      console.log(state.isInventoryOpen + "<--inventory state");
    },
  },
});

export const { toggleInventory, addInventoryItem, removeInventoryItem, } = inventorySlice.actions;
export  const inventoryReducer= inventorySlice.reducer;