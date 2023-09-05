import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userId: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      console.log(action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      
    },
  },
  extraReducers: (builder) => {
    // Your existing extraReducers for thunks can stay here
  },
});

export const { setAuthenticated, setUserId } = authSlice.actions;

export const authReducer = authSlice.reducer;


