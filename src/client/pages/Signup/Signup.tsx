import React, { useCallback, useEffect } from 'react';
import { useRegisterMutation } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FormPage from '../Forms/FormPage';
import { setUser } from '../../state/authSlice';
import Step1 from './Step1';
import { ButtonSection } from '../../components/Form/form';
import Button from '../../components/Button/button';
import SignupImage from '../../assets/signup_image.svg';
import GoogleIcon from '../../assets/google_icon.svg';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const dispatch = useAppDispatch();
    const [registerUser] = useRegisterMutation();
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const onSubmit = async (data: any) => {
        try {
            const signupResponse = await registerUser(data).unwrap();
            console.log(signupResponse);
            if (window !== undefined) {
                window.localStorage.setItem('token', signupResponse.token);
            }
            dispatch(setUser(signupResponse.user));
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = useCallback(onSubmit, []);

    return (
        <>
            <FormPage
                onSubmit={handleSubmit}
                steps={[Step1]}
                image={SignupImage}
                header="Create New Account"
                initialValues={{}}
            >
                <ButtonSection>
                    <Button inverted={true}>
                        <img aria-hidden={true} src={GoogleIcon} alt="Google Icon" />
                        <span>Sign up with Google</span>
                    </Button>
                </ButtonSection>
            </FormPage>
        </>
    );
}

export default SignUp;
