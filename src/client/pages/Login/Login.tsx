import React from 'react';
import Button from '../../components/Button/button';
import {
    Layout,
    Container,
    Form,
    FormHeader,
    FormSection,
    ImageSection,
    Input,
    Image,
    Label,
    Link,
} from './Login.styles';
import LoginImage from '../../assets/login_image.svg';

function Login() {
    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>Login</FormHeader>
                    <Form action="submit">
                        <Label htmlFor="email">Email *</Label>
                        <Input type="text" name="email" id="email" />
                        <Label htmlFor="password">Password *</Label>
                        <Input type="password" name="password" id="password" />
                        <Link style={{ textAlign: 'right', marginTop: '1vh' }} to="#">
                            Forgot password?
                        </Link>
                    </Form>

                    <Button>Login</Button>
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
