import { signOut } from "firebase/auth";
import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './../utils/firebase/firebase.utils';

// as the actual value that we want to access.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};


const INITIAL_STATE = {
    currentUser: null,
};
const userReducer = (state, { type, payload }) => {
    console.log('dispatched');
    console.log(type);

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            throw new Error('unknown action type');
    }

};

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);


    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
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