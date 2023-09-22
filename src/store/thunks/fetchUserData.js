import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase'; // adjust the import as needed

//fetches data from the firestore database
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (userId, { rejectWithValue }) => {
      try {
        //userRef equals the document associated with their userID in firestore
        const userRef = db.collection('users').doc(userId);

        //doc declared equal to results of that async operation
        const doc = await userRef.get();
  
        if (!doc.exists) {
          console.error('No user found!');
          return rejectWithValue('No user found');
        }
  
        console.log("Fetched User Data:", doc.data());
        return doc.data(); // The data will be handled by the fulfilled case in userSlice

      }

      catch (error) {
        console.error('Failed to fetch user data:', error);
        //return the value of the error in string format.
        return rejectWithValue(error.toString());
      }
    }
  );
  
  export default fetchUserData;