import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase.config";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            return unsubscribe
        }
    },[auth])
    const userProfile =(name,photourl)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL:photourl
        })
    }
    const userlogout = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const googleLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }


    const authInfo ={
        user,
        loading,
        createUser,
        signInUser,
        userlogout,
        userProfile,
        googleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;