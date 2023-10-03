import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData } from '../thunks/fetchUserDataThunk';
import { db } from '../../firebase';

// User slice is used to manage additional user-specific data that is fetched 
// from Firestore after the user has been authenticated

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId, profileData }) => {
    // No need to get userId from getState since it's passed as a parameter.
    // Create a reference to the user document in Firestore
    const userRef = db.collection('users').doc(userId);

    // Update the username field in the user's profile
    await userRef.update({
      'profile.username': profileData.name,
      'profile.avatar': profileData.avatar
    });

    // Return the updated profile data
    return { username: profileData.name, avatar: profileData.avatar };
  }
);


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
      }).addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userData.profile = action.payload;
        state.loading = false;
        state.error = null;

      });
  },
});

//better export format from slice 
export const { actions: userActions, reducer: userReducer } = userSlice;