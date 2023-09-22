import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase'; // adjust the import as needed

//fetches data from the firestore database
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (userId, { rejectWithValue }) => {
      try {
        //userRef equals the document associated with their userID in firestore
        const userRef = db.collection('users').doc(userId);

        //doc declared equal to results of the async operation above
        const doc = await userRef.get();
        
  
        if (!doc.exists) {
          console.error('No user found!');
          return rejectWithValue('No user found');
        }
        
        const userData = doc.data();
        // Check if userData and createdAt exist, then convert createdAt to a JavaScript Date object
        if (userData && userData.createdAt) {

          //converted to serializable format from firebase datestamp format
          //so that it works with Redux
          userData.createdAt = userData.createdAt.toDate().toISOString();
        }
  
        console.log("Fetched User Data:", userData);
        return userData; // The data will be handled by the fulfilled case in userSlice

      }
       

      catch (error) {
        console.error('Failed to fetch user data:', error);
        //return the value of the error in string format.
        return rejectWithValue(error.toString());
      }
    }
  );
  
  export default fetchUserData;