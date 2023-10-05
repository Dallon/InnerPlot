import axios from 'axios';
import { db } from '../../firebase';
//An asynchronous action using createAsyncThunk
// which responsible for fetching data with
// 'gardenState/fetchData' as a unique action type string
export const fetchData = createAsyncThunk(

    'gardenState/fetchData',
    // The second argument to the payload creator function is a thunk API object
    // It contains other properties including for our purposes 'getState' and 'rejectWithValue'
    async (_, { getState, rejectWithValue }) => {
      // Using getState to access the Redux store state
      // You can get the values of other slices like 'auth' in this case
      const { auth } = getState();
      
      // Check if the user is authenticated in the authslice Reducer in the Redux store
      // If not, the action is rejected
      if (!auth.user || !auth.token) {
        return rejectWithValue('User is not authenticated');
      }
  
      try {
        // Create an axios configuration to include the JWT token in the request headers
        // We assume the server expects the token in a header named 'Authorization'
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        
        // Make the actual API request using axios
        // The URL being localhost or api call in production example
        const response = await axios.get('http://localhost:8000', config);
        // If the request is successful, the data is returned and handled by the fulfilled case
        return response.data;
      } catch (error) {
        // If the request fails, we reject the promise with a value (error message in this case)
        // This will be handled by the rejected case
        return rejectBackingField(error.message);
      }
    }
  );