import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser } from '../../state/authSlice';
import Step1 from './Step1';
import FormPage from '../Forms/FormPage';
import TextButton from '../../components/TextButton/textButton';
import LoginImage from '../../assets/login_image.svg';
import { isEmpty } from '../../_helpers/objectHelpers';

interface LocationState {
    from: {
        pathname: string;
    };
}

function Login() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [loginMutation] = useLoginMutation();
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
            // TODO: implement central error handling
        }
    };
    const handleSubmit = useCallback(onSubmit, []);

    return (
        <>
            <FormPage
                onSubmit={handleSubmit}
                steps={[Step1]}
                image={LoginImage}
                header="Login"
                initialValues={{}}
            >
                <section style={{ textAlign: 'center' }}>
                    <TextButton style={{ fontSize: '1em' }} onClick={() => navigate('#')}>
                        Forgot password?
                    </TextButton>
                    <p>
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
