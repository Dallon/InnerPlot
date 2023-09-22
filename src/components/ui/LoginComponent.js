import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from '@firebase/app-compat';
import  firebaseInstance  from '../../firebase';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setUserId } from '../../store/slices/authSlice';
import { db } from '../../firebase';

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
        // Make sure this line is correct, not firebase().auth
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],

      callbacks: {
        signInSuccessWithAuthResult: async (authResult) => {
          dispatch(setAuthenticated(true));
          dispatch(setUserId(authResult.user.uid));
          
          //get a reference to the user's document, declare a variable to be that document.
          const userRef = db.collection('users').doc(authResult.user.uid);
          const doc = await userRef.get();
        
          if (!doc.exists) {
            // This means the user is new. Let's create a document for them.
            await userRef.set({
              profile: {
                username: '',
                email: user.email, 
                avatar: '', 
              },
              gameStats: {
                levelsCompleted: 0,
                scores: [],
                achievements: [],
                timePlayed: 0,
              },
              settings: {
                sound: true,
                notifications: true,
                theme: 'default',
              },
              inventory: {
                items: {},
                currency: 0,
              },
            
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            console.log('Creating new document for user:', authResult.user.uid);
          }

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
