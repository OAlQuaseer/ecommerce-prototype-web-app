// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithPopup, 
    signInWithRedirect, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, writeBatch, collection, query, getDocs } from 'firebase/firestore'

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

const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.getCustomParameters({
    prompt: "select_account"
})

// this auth instance is singleton because it keeps track of the authentication state of the entire application. 
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleAuthProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };

export const createUserDocumentFromAuth = async (userAuth) => {
    // first, we need to see if there is an existing document reference.
    // the third argument is going to be a unique id identifier, in our case its uid that we get from the user authentication response.

    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapShot = await getDoc(userDocRef);

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
    } else {
        const lastTimeSignedIn = new Date();
        await setDoc(userDocRef, {
            ...userSnapShot.data(),
            lastTimeSignedIn
        })
    }

    return userDocRef;

}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
}

export const signInUserWithEmailAndPassword = async (email, password)=> {
    if (!email || !password) return;
    const userCredential = await signInWithEmailAndPassword(auth, email,password);
    return userCredential;
}

export const signOutCurrentUser = async () => {
    const response = await signOut(auth);
    return response;
}

export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback)


