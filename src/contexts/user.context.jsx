import { signOut } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './../utils/firebase/firebase.utils';

// as the actual value that we want to access.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            console.log(user);
            setCurrentUser(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
        })
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        setCurrentUser
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}