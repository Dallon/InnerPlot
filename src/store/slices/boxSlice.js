// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state definition
const initialState = {
  availableCells: [
    { x: 0, y: 0, width: 50, height: 50, unlocked: true },
    { x: 50, y: 0, width: 50, height: 50, unlocked: true },
    { x: 0, y: 50, width: 50, height: 50, unlocked: false },
    { x: 50, y: 50, width: 50, height: 50, unlocked: false },
  ],
};

// Create the slice
export const boxSlice = createSlice({
  name: 'boxState',
  initialState,
  reducers: {
    // Action to update cell dimensions
    updateCellDimensions: (state, action) => {
      // Loop through all available cells to update their dimensions
      state.availableCells = state.availableCells.map(cell => {
        // Update the width and height based on newCellSize
        const newWidth = action.payload.newCellSize;
        const newHeight = action.payload.newCellSize;

        // Update the position based on the new dimensions
        // This is a simplified example; your calculations might differ
        const newX = (cell.x / cell.width) * newWidth;
        const newY = (cell.y / cell.height) * newHeight;

        return {
          ...cell,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        };
      });
    },
    // ... other reducers
  },
});

// Export actions
export const { updateCellDimensions } = boxSlice.actions;

// Export reducer
export const boxSliceReducer = boxSlice.reducer;
