    // gardenStateSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../thunks/fetchGardenDataThunk';

// fetchData is responsible for fetching data with
// 'gardenState/fetchData' as a unique action type string
const fetchData = fetchData;

// Define the initial state and reducers using createSlice from Redux Toolkit
export const gardenStateSlice = createSlice({
  name: 'gardenState', // The name of the slice, used as a prefix for action types
  initialState: { // The initial state of this slice
    data: null,
    grid: [],
    isLoading: false,
    status: 'idle',
  },
  reducers: { 
    // Synchronous reducers can be defined here
  },
  
  extraReducers: (builder) => { 
    // Handle actions defined outside this slice
    // We add extra reducers to handle the cases when the fetchData thunk is fulfilled or rejected
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        // When the promise is successful, update the state with the returned data
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchData.rejected, (state, action) => {
        // When the promise is rejected, update the state with an error message
        state.status = 'failed';
        state.error = action.payload;
      })
       .addCase(fetchGarden.fulfilled, (state, action) => {
                state.grid = action.payload;
                state.isLoading = false;
            });
  },
});

// Export the automatically generated reducer function
export default gardenStateSlice.reducer;

