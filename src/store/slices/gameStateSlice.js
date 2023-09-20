import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  objects: {
    //byId is like a lookup table. It allows you
    // to quickly find and modify an object using its id.
    byId: {
      '1': { x: 10, y: 30, type: 'tree', id: '1' },
      '2': { x: 15, y: 40, type: 'rock', id: '2' }
    },
    //allIds is an array that holds all the ids in the order they were 
    //added or based on some other sorting criteria you may have.
    // It is useful for scenarios where you need to know the order 
    //of objects or iterate over them in a specific sequence.
    allIds: ['1', '2']
  }
};

export const gameStateSlice  = createSlice({
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
          delete state.objects.byId[idToRemove];
          state.objects.allIds = state.objects.allIds.filter(id => id !== idToRemove);
        },
    },
});

export const { addObject, removeObject} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;