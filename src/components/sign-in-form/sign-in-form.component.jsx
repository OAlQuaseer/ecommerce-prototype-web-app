import './sign-in-form.styles.scss';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { useState, useEffect } from 'react';
import { signInUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect, auth } from './../../utils/firebase/firebase.utils'
import { getRedirectResult } from 'firebase/auth';


const signInFormInitialValue = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [signInFormInputs, setSignInFormInputs] = useState(signInFormInitialValue);
    const { email, password } = signInFormInputs;

    const logGoogleUserByPopup = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const { user: userAuth } = response;
        await createUserDocumentFromAuth(userAuth);
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


    const onChangeHandler = ({ target: { name, value } }) => {
        setSignInFormInputs({
            ...signInFormInputs,
            [name]: value
        })
    }

    const resetFormFields = () => {
        setSignInFormInputs(signInFormInitialValue);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            return
        }
        try {
            const userCredential = await signInUserWithEmailAndPassword(email, password);
            const { user } = userCredential;
            const userDoc = await createUserDocumentFromAuth(user)
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>

                <FormInput label='Email' type="email" required onChange={onChangeHandler} name='email' value={email} />

                <FormInput label='Password' type="password" required onChange={onChangeHandler} name='password' value={password} />

                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>

                    <Button buttonType='google' type='button' onClick={logGoogleUserByPopup}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}


export default SignInForm;
