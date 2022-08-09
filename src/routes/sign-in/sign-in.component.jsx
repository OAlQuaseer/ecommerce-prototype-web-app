import './sign-in.styles.scss';
import { useEffect } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm  from './../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    const logGoogleUserByPopup = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const { user: userAuth } = response;
        const userDocRef = await createUserDocumentFromAuth(userAuth);
    };

    const logGoogleUserByRedirect = async () => await signInWithGoogleRedirect();

    useEffect(() => {
        async function getResponseFromRedirectResult() {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                const { user: userAuth } = response;
                const userDocRef = await createUserDocumentFromAuth(userAuth);
            }
        }
        getResponseFromRedirectResult();
    }, [])


    return (
        <div>
            <div>
                <button onClick={logGoogleUserByPopup}>
                    sign in with Google Popup
                </button>
            </div>
            <div>
                <SignUpForm/>
            </div>

        </div>)
}


export default SignIn;