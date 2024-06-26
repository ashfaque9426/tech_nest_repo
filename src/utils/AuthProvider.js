"use client"
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '@/lib/firebase/config';
import axios from 'axios';
import { fetchUserData } from '@/services/userServices';
import { useDispatch } from 'react-redux';
import { checkUser, userStateChangeSuccessfull, userStateReset } from '@/lib/redux/features/userSlice';
import { accessDenied, accessGranted } from '@/lib/redux/features/authorizationSlice';

export const AuthContext = createContext(null);

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
            // console.log(userCredential);
            const userInfoData = {};
            if (userCredential && userCredential?.email) {
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
                    userInfoData['firstName'] = userData.firstName;
                    userInfoData['lastName'] = userData.lastName;
                    userInfoData['email'] = userData.email;
                    userInfoData['phone'] = userData.phone;
                    userInfoData['imgUrl'] = userData.imgUrl;
                    userInfoData['role'] = userData.role;
                    userInfoData['address'] = userData.address;
                }
            }
            else {
                localStorage.removeItem('tech-token');
                dispatch(userStateReset());
                dispatch(accessDenied());
                setUser({});
                setLoading(false);
            }
            

            if (Object.keys(userInfoData)?.length > 0) {
                dispatch(checkUser());
                dispatch(updateUserState(userInfoData));
                dispatch(userStateChangeSuccessfull());
                dispatch(accessGranted());
                setUser(userInfoData);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;