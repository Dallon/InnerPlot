import { createSlice } from '@reduxjs/toolkit';
import { AssetManifest } from '../../AssetManifest';

const initialState = {
  objects: {
    //byId is like a lookup table. It allows you
    // to quickly find and modify an object using its id.
    byId: {
      '1': { x: 100, y: 100, url: AssetManifest.images.items.blackOakSeedling, id: '1' },
      '2': { x: 200, y: 150, url: AssetManifest.images.items.bluePotion, id: '2' }

    },
    //allIds is an array that holds all the ids in the order they were 
    //added or based on some other sorting criteria
    // It is useful for scenarios where you need to know the order 
    //of objects or iterate over them in a specific sequence.
    allIds: ['1', '2'],
    toBeRemoved: [],
  },
 
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    addObject: (state, action) => {
      const newObject = action.payload;
      state.objects.byId[newObject.id] = newObject;
      state.objects.allIds.push(newObject.id);
      
    },
    removeObject: (state, action) => {
      const idToRemove = action.payload;
      //proxy objects *parsed to a string for better debugging
      console.log("Before delete:", JSON.parse(JSON.stringify(state.objects.byId)));
      state.objects.toBeRemoved.push(idToRemove);
      delete state.objects.byId[idToRemove];
      console.log("After delete:", JSON.parse(JSON.stringify(state.objects.byId)));
      
      state.objects.allIds = state.objects.allIds.filter(id => id !== idToRemove);
    },

    clearToBeRemoved: (state) => {
      state.objects.toBeRemoved = [];
    },
    
  },
});

export const { addObject, removeObject, clearToBeRemoved } = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;