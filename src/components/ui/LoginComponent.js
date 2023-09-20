import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from '@firebase/app-compat';
import firebaseInstance from '../../firebase';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setUserId } from '../../store/slices/authSlice';


function LoginComponent() {
  const dispatch = useDispatch();

  //Initialize the firebaseUI widget below in a useEffect

  useEffect(() => {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebaseInstance.auth());
    }
    
    const uiConfig = {
      signInOptions: [
        // Make sure this line is correct
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          dispatch(setAuthenticated(true));
          dispatch(setUserId(authResult.user.uid));
          return false;  // Prevent redirect
        },
        signOut: () => {
          // Dispatch an action when signed out
          dispatch(setAuthenticated(false));
        },
      },
      // ... other configurations
    };

    ui.start('#firebaseui-auth-container', uiConfig);
  }, [dispatch]);

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default LoginComponent;
