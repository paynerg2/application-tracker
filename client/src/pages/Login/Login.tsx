import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation, useGoogleAuthMutation } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser } from '../../state/authSlice';
import Step1 from './Step1';
import FormPage from '../Forms/FormPage';
import TextButton from '../../components/TextButton/textButton';
import LoginImage from '../../assets/login_image.svg';
import { isEmpty } from '../../_helpers/objectHelpers';
import GoogleLoginComponent from '../../components/Google/GoogleLogin';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

interface LocationState {
    from: {
        pathname: string;
    };
}

function Login() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [loginMutation] = useLoginMutation();
    const [googleAuth] = useGoogleAuthMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const { from } = state || { from: { pathname: '/' } };

    useEffect(() => {
        if (!isEmpty(user)) {
            navigate(from, { replace: true });
        }
    }, [user, dispatch]);

    const onSubmit = async (data: any) => {
        try {
            const loginResponse = await loginMutation(data).unwrap();
            if (window !== undefined) {
                window.localStorage.setItem('token', loginResponse.token);
            }
            dispatch(setUser(loginResponse.user));
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = useCallback(onSubmit, []);

    const handleGoogleLogin = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        if ((response as GoogleLoginResponse).tokenId !== undefined) {
            try {
                //@ts-ignore
                const googleAuthResponse = await googleAuth(response.tokenId).unwrap();
                if (window !== undefined) {
                    window.localStorage.setItem('token', googleAuthResponse.token);
                }
                dispatch(setUser(googleAuthResponse.user));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <FormPage
                onSubmit={handleSubmit}
                steps={[Step1]}
                image={LoginImage}
                header="Login"
                initialValues={{}}
            >
                <GoogleLoginComponent loginSuccess={handleGoogleLogin} />
                <section style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0 }}>
                        Not registered yet?{' '}
                        <TextButton style={{ fontSize: '1em' }} onClick={() => navigate('/signup')}>
                            Create an account
                        </TextButton>
                    </p>
                </section>
            </FormPage>
        </>
    );
}

export default Login;
