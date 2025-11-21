import React, { useEffect, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.config'

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const loginEmailRef = useRef("")
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const createUserFunc = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithemailfunc = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signinWithPopupfunc = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const signOutfunc = () =>{
        return signOut(auth);
    }

    const sendPasswordResetEmailfunc = (email) => {
        return sendPasswordResetEmail(auth,email)
    }

    const updateProfilefunc = (displayName, photoURL) =>{
        return updateProfile(auth.currentUser,{ displayName, photoURL })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        createUserFunc,
        signInWithemailfunc,
        signinWithPopupfunc,
        user,
        setUser,
        signOutfunc,
        loading,
        setLoading,
        sendPasswordResetEmailfunc,
        updateProfilefunc,
        loginEmailRef,

    }
    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    )
}

export default AuthProvider