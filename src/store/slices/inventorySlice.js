//inventorySlice.js  

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isInventoryOpen: false,
    //inventory handles inventory item state.
  inventory: {
    byId: {},
    allIds: []
  }
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
      const { [idToRemove]: _, ...newById } = state.objects.byId;
      state.objects.byId = newById;

      state.inventory.allIds = state.inventory.allIds.filter(id => id !== idToRemove);
    },
    toggleInventory: (state) => {
      state.isInventoryOpen = !state.isInventoryOpen;
      console.log(state.isInventoryOpen + "<--inventory state");
    },
  },
});

export const { toggleInventory, addInventoryItem, removeInventoryItem } = inventorySlice.actions;
export  const inventoryReducer = inventorySlice.reducer;