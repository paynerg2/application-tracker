import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import Link from '../../components/Link/link';
import {
    FormHeader,
    Error,
    Layout,
    Container,
    Form,
    FormSection,
    Image,
} from '../../components/Form/form';
import { ImageSection } from './Login.styles';
import LoginImage from '../../assets/login_image.svg';
import { useAuth } from '../../hooks/useAuth';

interface LocationState {
    from: {
        pathname: string;
    };
}

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const { login } = useAuth();

    const { from } = state || { from: { pathname: '/' } };

    const onSubmit = async (data: any) => {
        try {
            await login(data);
            navigate(from, { replace: true });
        } catch (error) {
            // TODO: implement central error handling
        }
    };

    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>Login</FormHeader>
                    <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                        <Input id="email" label="Email" register={register} required type="text" />
                        <Error>{errors.email ? 'Required' : ' '}</Error>
                        <Input
                            id="password"
                            label="Password"
                            register={register}
                            required
                            type="password"
                        />
                        <Error>{errors.password ? 'Required' : ' '}</Error>
                    </Form>

                    <Button
                        disabled={errors.email || errors.password}
                        type="submit"
                        form="loginForm"
                    >
                        Login
                    </Button>
                    <section style={{ textAlign: 'center' }}>
                        <Link to="#">Forgot password?</Link>
                        <p>
                            Not registered yet? <Link to="/signup">Create an account</Link>
                        </p>
                    </section>
                </FormSection>
                <ImageSection>
                    <Image aria-hidden={true} src={LoginImage} alt="Login Image" />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default Login;
