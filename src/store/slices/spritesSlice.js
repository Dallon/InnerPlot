import { createSlice } from '@reduxjs/toolkit';
import { AssetManifest } from '../../AssetManifest';

const initialState = {
  objects: {
    //byId is like a lookup table. It allows you
    // to quickly find and modify an object using its id.
    byId: {
      '5': { x: 100, y: 100, url: AssetManifest.images.sprites.bush1Sprite.url, id: '5', assetKey: 'bush1Sprite' },
      '6': { x: 400, y: 200, url: AssetManifest.images.sprites.flower1Sprite.url, id: '6', assetKey: 'flower1Sprite' },
      '7': { x: 450, y: 300, url: AssetManifest.images.sprites.soil1Sprite.url, id: '7', assetKey: 'soil1Sprite' }
    },
    //allIds is an array that holds all the ids in the order they were 
    //added or based on some other sorting criteria
    // It is useful for scenarios where you need to know the order 
    //of objects or iterate over them in a specific sequence.
    allIds: ['5', '6', '7'],
    toBeRemoved: [],
  },

};

export const spriteSlice = createSlice({
  name: 'spriteState',
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
    plantNewSeed: (state, action) => {
      //the incoming payload = these input values
      const { id, x, y, url, assetKey } = action.payload;
      //the object labelled with this Id in byId equals...
      state.objects.byId[id] = { x, y, url, id, assetKey };
      //add the id to allIds.
      state.objects.allIds.push(id);
    },

    clearToBeRemoved: (state) => {
      state.objects.toBeRemoved = [];
    },

  },
});

export const { addObject, removeObject, clearToBeRemoved, plantNewSeed } = spriteSlice.actions;
export const spriteStateReducer = spriteSlice.reducer;