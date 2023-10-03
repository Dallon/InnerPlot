import { createSlice } from '@reduxjs/toolkit';
import 'firebase/compat/auth';


const initialState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //synchronous reducers
    //In the setUserId reducer, the assumption is that the action.payload 
    //directly contains the value for the user ID, handled by authReducer hook

          setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            // console.log(action.payload);
          },
          setUserId: (state, action) => {
            state.userId = action.payload;
            // console.log("User ID: " + action.payload)
            
          },
        },
});

export const { setAuthenticated, setUserId } = authSlice.actions;
export const authReducer = authSlice.reducer;


