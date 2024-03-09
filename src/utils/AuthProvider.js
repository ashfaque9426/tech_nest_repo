"use client"
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '@/lib/firebase/config';
import axios from 'axios';
import { fetchUserData } from '@/services/userServices';
import { useDispatch } from 'react-redux';
import { checkUser, userStateChangeSuccessfull, userStateReset } from '@/lib/redux/features/userSlice';
import { accessDenied, accessGranted } from '@/lib/redux/features/authorizationSlice';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithEP = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signInWithEP,
        updateUserProfile,
        googleSignIn,
        logOut
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, userCredential => {
            if (userCredential) {
                axios.post('http://localhost:3000/jwt', { userEmail: userCredential?.email })
                    .then(data => {
                        if(data.data.success) {
                            localStorage.setItem('tech-token', data.data.token);
                            setLoading(false);
                        }
                    })
                    .catch(err => console.log(err));
                
                const { userData = {} } = fetchUserData({ userEmail: userCredential?.email });

                if (Object.keys(userData).length > 0) {
                    setUser(userData);
                }
            }
            else {
                localStorage.removeItem('tech-token');
                dispatch(userStateReset());
                dispatch(accessDenied());
                setUser({});
            }
            

            if(Object.keys(user).length > 0) {
                dispatch(checkUser());
                dispatch(updateUserState(user));
                dispatch(userStateChangeSuccessfull());
                dispatch(accessGranted());
            }
        });

        return () => unsubscribe();
    }, [user, dispatch]);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;