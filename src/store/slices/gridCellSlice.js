import { createSlice } from "@reduxjs/toolkit";

const gridCellSlice = createSlice({
    name: 'gridCells',
    initialState: {
        clickableCells: { r7c10: { status: 'UNTOUCHED' }, r8c10: { status: 'UNTOUCHED' }, r9c10: { status: 'UNTOUCHED' }, r10c10: { status: 'UNTOUCHED' } },
    },

    reducers: {
        setCellStatus: (state, action) => {
          const { cellKey, status } = action.payload;
          if (state.clickableCells[cellKey]) {
            state.clickableCells[cellKey].status = status;
          }
        },
      },
    });
    

export const { setCellStatus } = gridCellSlice.actions;
export const gridCellReducer = gridCellSlice.reducer;

