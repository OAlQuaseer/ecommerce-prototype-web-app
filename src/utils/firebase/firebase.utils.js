// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3ONFWXlECmpxeOJ_qxriPZC-p1fcQ0AU",
    authDomain: "ecommerce-prototype-backend.firebaseapp.com",
    projectId: "ecommerce-prototype-backend",
    storageBucket: "ecommerce-prototype-backend.appspot.com",
    messagingSenderId: "395239075596",
    appId: "1:395239075596:web:c58401932e21eb3f6da329"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // first, we need to see if there is an existing document reference.
    // the third argument is going to be a unique id identifier, in our case its uid that we get from the user authentication response.

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        const lastTimeSignedIn = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                lastTimeSignedIn
            })
        } catch (error) {
            console.log(error);
        }
    }else {
        const lastTimeSignedIn = new Date();
        await setDoc(userDocRef, {
            ...userSnapShot.data(),
            lastTimeSignedIn
        })
    }

    return userDocRef;

}

