import { createSlice } from '@reduxjs/toolkit';
import { AssetManifest } from '../../AssetManifest';

const initialState = {
  objects: {
    //byId is like a lookup table. It allows you
    // to quickly find and modify an object using its id.
    byId: {
      '1': { x: 100, y: 100, url: AssetManifest.images.items.blackOakSeedling, id: '1', assetKey: 'blackOakSeedling', quantity: 1, levelReq: 0, itemType: 'consumable', bonuses: {}, location: 'N/A'},
      '2': { x: 200, y: 150, url: AssetManifest.images.items.bluePotion, id: '2', assetKey: 'bluePotion', quantity: 1, levelReq: 0, itemType: 'consumable', bonuses: {}, location: 'N/A'},
    },
    //allIds is an array that holds all the ids in the order they were 
    //added or based on some other sorting criteria
    // It is useful for scenarios where you need to know the order 
    //of objects or iterate over them in a specific sequence.
    allIds: ['1', '2'],
    toBeRemoved: [],
  },

};

export const itemSlice = createSlice({
  name: 'itemState',
  initialState,
  reducers: {
    addObject: (state, action) => {
      const newObject = action.payload;

      // Check for existing object by type (e.g., 'name' in this case)
      const existingKey = Object.keys(state.objects.byId).find(key =>
        state.objects.byId[key].assetKey === newObject.assetKey
      );

      if (existingKey) {
        // Increment quantity for the existing object
        state.objects.byId[existingKey].quantity += newObject.quantity;
      } else {
        // Add new object
        state.objects.byId[newObject.id] = newObject;
        state.objects.allIds.push(newObject.id);
      }
    },

    removeObject: (state, action) => {
      const idToRemove = action.payload;

      const existingObject = state.objects.byId[idToRemove];

      if (existingObject) {
        // Check if the user wants to remove all or just one instance
        if (existingObject.quantity === 1) {
          state.objects.toBeRemoved.push(idToRemove);
          console.log("object pushed to toBeRemvoved" + state.objects.toBeRemoved)
          delete state.objects.byId[idToRemove];
          state.objects.allIds = state.objects.allIds.filter(id => id !== idToRemove);
        } else if (existingObject.quantity > 1) {

          existingObject.quantity -= 1;
        }
      }

      // For debugging
      console.log("After delete:", JSON.parse(JSON.stringify(state.objects.byId)));
    },

  },
});

export const { addObject, removeObject, clearToBeRemoved } = itemSlice.actions;
export const itemStateReducer = itemSlice.reducer;