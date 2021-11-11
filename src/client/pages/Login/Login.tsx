import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import Link from '../../components/Link/link';
import { FormHeader } from '../../components/Form/form';
import { Layout, Container, Form, ImageSection, FormSection, Image } from './Login.styles';
import LoginImage from '../../assets/login_image.svg';
import { useLoginMutation } from '../../services/authApi';
import { LoginForm } from '../../../types';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [login] = useLoginMutation();

    const onSubmit = async (data: LoginForm) => {
        try {
            const loginResponse = await login(data).unwrap();
            console.log(loginResponse);
            // TODO: redirect to destination
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
                        {errors.email && <span>This field is required</span>}
                        <Input
                            id="password"
                            label="Password"
                            register={register}
                            required
                            type="password"
                        />
                        {errors.password && <span>This field is required</span>}
                        <Link style={{ textAlign: 'right', marginTop: '1vh' }} to="#">
                            Forgot password?
                        </Link>
                    </Form>

                    <Button type="submit" form="loginForm">
                        Login
                    </Button>
                    <p style={{ textAlign: 'center' }}>
                        Not registered yet? <Link to="#">Create an account</Link>
                    </p>
                </FormSection>
                <ImageSection>
                    <Image aria-hidden={true} src={LoginImage} alt="Login Image" />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default Login;
