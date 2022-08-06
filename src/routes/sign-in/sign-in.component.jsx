import './sign-in.styles.scss';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const {user : userAuth} = response;
        const userDocRef = await createUserDocumentFromAuth(userAuth);
    };
    return (
        <div>
            <button onClick={logGoogleUser}>
                sign in with Google Popup 
            </button>
        </div>)
}


export default SignIn;