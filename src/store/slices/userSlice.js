import { createSlice } from '@reduxjs/toolkit';
import fetchUserData from '../thunks/fetchUserData';

// User slice is used to manage additional user-specific data that is fetched 
// from Firestore after the user has been authenticated

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null, // this will store the user data fetched from Firestore
    loading: false,
    error: null,
  },
  reducers: {
    // add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        console.log("user data fetched " + action.payload)
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

//better export format from slice 
export const { actions: userActions, reducer: userReducer } = userSlice;