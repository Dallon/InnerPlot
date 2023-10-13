// File: /src/redux/userModeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'DEFAULT',
};

const userModeSlice = createSlice({
  name: 'userMode',
  initialState,
  reducers: {
    equip: (state) => {
      state.mode = 'EQUIP';
      //logic regarding equiping items

    },
    pickUp: (state) => {
      state.mode = 'PICKUP';
      //logic regarding picking up items
    },
    interaction: (state) => {
      state.mode = 'INTERACTION';
    },
    resetMode: (state) => {
      state.mode = 'DEFAULT';
    },
  },
});

// Actions
export const { equip, pickUp, interaction, resetMode } = userModeSlice.actions;

// Selector to get current user mode
export const selectUserMode = (state) => state.userMode.mode;

export const userModeReducer = userModeSlice.reducer;
