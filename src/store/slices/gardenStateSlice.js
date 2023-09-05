import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGarden = createAsyncThunk('gardenState/fetchGarden',
    async (userId) => {
        // Taking in userId, fetch garden state from server
        //steps here-- verify userID, valid token, fetch data
    });

const gardenStateSlice = createSlice({
    name: 'gardenState',
    initialState: {
        grid: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGarden.fulfilled, (state, action) => {
                state.grid = action.payload;
                state.isLoading = false;
            });

    },
});