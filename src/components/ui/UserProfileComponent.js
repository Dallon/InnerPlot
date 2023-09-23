import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/slices/userSlice';
import { auth } from 'firebaseui';

const UserProfile = () => {
  // Get the user data from the Redux store
  const userData = useSelector((state) => state.user.userData);
  const userId = useSelector ((state) => state.auth.userId);
  const wholeState = useSelector((state) => state);
  
  // Log the entire user data and Redux state to console
  console.log('User Data:', userData);
  console.log('Whole Redux State:', wholeState);

  const dispatch = useDispatch();
  
  console.log(userData);
  
  // Local state for form input
  //check first if userData exists.
  const [name, setName] = useState(userData?.profile.username || 'defaultName');
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
 
    // Dispatch the thunk to update the user profile in Firestore
    dispatch(updateUserProfile({ userId: userId, profileData: { name } }));
       console.log('User Data at handleSubmit:', userData);
    console.log("did we get here");
    console.log("the name once it is set is: " + name )
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UserProfile;