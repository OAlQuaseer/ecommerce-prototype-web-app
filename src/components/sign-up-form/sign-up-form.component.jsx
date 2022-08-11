import './sign-up-form.styles.scss'
import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from './../../utils/firebase/firebase.utils';
import FormInput from './../form-input/form-input.component';
import Button from './../button/button.component';
import { UserContext } from '../../contexts/user.context';

//initial values of the fields 
const signUpFormInputFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [inputFields, setInputFields] = useState(signUpFormInputFields);
    const { displayName, email, password, confirmPassword } = inputFields;
    const {currentUser} = useContext(UserContext);



    const onChangeHandler = ({ target: { name, value } }) => {
        setInputFields({
            ...inputFields,
            [name]: value
        });
    }

    const resetFormFields = () => {
        setInputFields(signUpFormInputFields)
    }

    const onSubmitHandler = async (event) => {

        event.preventDefault();

        if (password !== confirmPassword) {
            alert('the password and the confirm password dont match');
            return;
        }
        try {
            const userCredential = await createAuthUserWithEmailAndPassword(email, password);
            const { user } = userCredential;
            const userDoc = await createUserDocumentFromAuth({
                ...user,
                displayName
            })
            resetFormFields();
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                alert('Account is already used');
            }else if (errorCode === 'auth/weak-password'){
                alert('Password should be at least 6 characters');
            }else {
                console.log('error happened while creating a user with email and password method: ', errorMessage);
            }
        }

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>

                <FormInput label='Display name' type="text" required onChange={onChangeHandler} name='displayName' value={displayName} />

                <FormInput label='Email' type="email" required onChange={onChangeHandler} name='email' value={email} />

                <FormInput label='Password' type="password" required onChange={onChangeHandler} name='password' value={password} />

                <FormInput label='Confirm password' type="password" required onChange={onChangeHandler} name='confirmPassword' value={confirmPassword} />

                <Button type='submit'>Sign up</Button>
            </form>
        </div>
    );
}



export default SignUpForm;