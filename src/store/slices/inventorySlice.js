// inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

import { AssetManifest } from '../../AssetManifest';

//example of original item state format below, with x, y coordinates.
    // byId: {
    //   '1': { x: 100, y: 100, url: AssetManifest.images.items.blackOakSeedling, id: '1', assetKey: 'blackOakSeedling', quantity: 1 },
    //   '2': { x: 200, y: 150, url: AssetManifest.images.items.bluePotion, id: '2', assetKey: 'bluePotion', quantity: 1 },
    // },

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
      const { itemURL, itemAssetKey, itemId, quantity, levelReq, itemType, bonuses, location } = action.payload;
    
      if (!state.byId[itemId]) {
        // Item does not exist, add it with all properties
        state.byId[itemId] = {
          url: itemURL,
          id: itemId,
          assetKey: itemAssetKey,
          quantity: quantity,
          levelRequirement: levelReq,
          itemType: itemType,
          bonuses: bonuses || {}, // Use an empty object as default if bonuses are not provided
          location: location // This could be null or undefined if not applicable
        };
        state.allIds.push(itemId);
      } else {
        // Item already exists, increase the quantity
        state.byId[itemId].quantity += quantity;
      }
    },
    
    removeInventoryItem: (state, action) => {
      const { itemId, removeAll } = action.payload;

      const existingItem = state.byId[itemId];

      if (existingItem) {
        if (removeAll || existingItem.quantity === 1) {
          delete state.byId[itemId];
          state.allIds = state.allIds.filter(id => id !== itemId);
        } else if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
    },
    toggleInventory: (state) => {
      state.isInventoryOpen = !state.isInventoryOpen;
    },
  },
});

export const { toggleInventory, addInventoryItem, removeInventoryItem } = inventorySlice.actions;
export const inventoryReducer = inventorySlice.reducer;
