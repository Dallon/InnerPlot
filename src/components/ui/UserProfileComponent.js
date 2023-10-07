import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/slices/userSlice';
import { createSelector } from '@reduxjs/toolkit';




const UserProfile = () => {
  // Get the user data from the Redux store
  const userData = useSelector(state => state.user.userData);
  const userId = useSelector(state => state.auth.userId);

  const dispatch = useDispatch();
  //State for form input, checking first if userData exists
  const [name, setName] = useState(userData?.profile.username || 'defaultName');
  const [avatar, setAvatar] = useState(userData?.profile.avatar || null);


  const handleAvatarChange = (event) => {
    event.preventDefault();

    // Retrieve the file from the event object
    const file = event.target.avatar.files[0];

    if (file) {
      // temorarily using a local URL for the file object.
      const avatarUrl = URL.createObjectURL(file);
      setAvatar(avatarUrl);
      dispatch(updateUserProfile({ userId: userId, profileData: { avatar: avatarUrl } }));
    }
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Dispatch the thunk to update the user profile in Firestore
    dispatch(updateUserProfile({ userId: userId, profileData: { name } }));
    console.log("the name once it is set is: " + name)
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <div>
      <div>
        <form onSubmit={handleAvatarChange}>
          <label>
            Avatar:
            <input type="file" name="avatar" />
          </label>
          <button type="submit">Upload Avatar</button>
        </form>
        {/* If 'avatar' is falsey /does not have a meaningful value, this img tag will not be rendered.*/}
        {avatar && <img src={avatar} alt="User Avatar" />}
      </div>
      </div>
    </div>
  );
};

export default UserProfile;