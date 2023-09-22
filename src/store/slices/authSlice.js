import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (_, {rejectWithValue})=>{
    try{
      const user = firebase.auth().currentUser;
    if (user) {
   
      return { user: user.uid};
    } else{
      return rejectWithValue('No user is signed in.');
    }
    } catch (error){
      return rejectWithValue(error.message);
    }
  }
);

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
    //synchronous reducers
    //In the setUserId reducer, the assumption is that the
    //  action.payload directly contains the value for the user ID

          setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            console.log(action.payload);
          },
          setUserId: (state, action) => {
            state.userId = action.payload;
            console.log("User ID: " + action.payload)
            
          },
        },

  extraReducers:(builder) =>{
    builder
    .addCase(authenticateUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload;
      state.loading = false;
    })
    .addCase(authenticateUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    });

  }
});

export const { setAuthenticated, setUserId } = authSlice.actions;
export const authReducer = authSlice.reducer;


