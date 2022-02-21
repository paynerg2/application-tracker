import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../components/Input/input';
import {
    FormHeader,
    Error,
    Layout,
    Container,
    FormSection,
    ImageSection,
    Image,
    Form,
    ButtonSection,
} from '../../components/Form/form';
import { SignUpForm } from '../../../types';
import Button from '../../components/Button/button';
import SignupImage from '../../assets/signup_image.svg';
import GoogleIcon from '../../assets/google_icon.svg';
import { useRegisterMutation } from '../../services/authApi';

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [registerUser] = useRegisterMutation();

    const onSubmit = async (data: any) => {
        try {
            const signupResponse = await registerUser(data).unwrap();
            console.log(signupResponse);
        } catch (error) {
            //TODO: implement central error handling
        }
    };

    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader style={{ fontSize: '2rem' }}>Create an Account</FormHeader>
                    <Form id="signup" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id="fullName"
                            label="Full Name"
                            register={register}
                            required
                            type="text"
                        />
                        <Error>{errors.fullName ? 'Required' : ' '}</Error>
                        <Input id="email" label="Email" register={register} required type="email" />
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
                    <ButtonSection>
                        <Button form="signup" type="submit">
                            Create Account
                        </Button>
                        <Button inverted={true}>
                            <img aria-hidden={true} src={GoogleIcon} alt="Google Icon" />
                            <span>Sign up with Google</span>
                        </Button>
                    </ButtonSection>
                </FormSection>
                <ImageSection>
                    <Image aria-hidden={true} src={SignupImage} alt="Signup Image" />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default SignUp;
