import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    objects: [
        //sample objects
        {x: 0, y: 0, type: 'tree', id: '1'},
        {x: 1, y: 0, type: 'rock', id: '2'},

    ]
};

export const gameStateSlice  = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        addObject: (state, action) => {
            state.objects.push(action.payload);
            console.log(action.payload);
        },
        removeObject: (state, action) => { 
            state.objects = state.objects.filter(obj => obj.id !== action.payload.id);
        },
    },
});

export const { addObject, removeObject} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;