import { useEffect } from "react";
import firebaseInstance from "../firebase";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUserId } from "../store/slices/authSlice";

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const detachAuthListener = firebaseInstance.auth()
        .onAuthStateChanged((user) =>{
            if (user) {
                dispatch(setAuthenticated(true));
                dispatch(setUserId(user.uid));
            } else {
                dispatch(setAuthenticated(false));
                dispatch(setUserId(null));
            }
        });
        //detaches authStateListener when component unmounts
        return () => detachAuthListener();
    })
}

export default useAuthListener;