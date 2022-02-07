import React from 'react';
import { Route, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    FormHeader,
    Layout,
    Container,
    FormSection,
    ImageSection,
    Image,
    Form,
} from '../../components/Form/form';
import Stepper from '../../components/Form/stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import NewApplicationImage from '../../assets/New_Application_Image.svg';

import { useAddNewApplicationMutation } from '../../services/api';

// TODO: Add mutation for new application

interface NewApplicationParams {
    step: string | undefined;
}

function NewApplication() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { step } = useParams<NewApplicationParams>();
    const currentStep = step ? parseInt(step) : 1;

    const [addNewApplication, { isLoading }] = useAddNewApplicationMutation();

    const onSubmit = async (data: any) => {
        const newApplication = {
            ...data,
            datePosted: new Date(data.datePosted),
            dateApplicationSent: new Date(data.dateApplicationSent),
        };
        console.log(newApplication);
        try {
            await addNewApplication(newApplication);
        } catch (error) {
            console.log(error);
        }
    };

    // todo: updgrade to react-router v6 to implement better route nesting
    // todo: form validation
    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>Add a New Application</FormHeader>
                    <Stepper steps={3} currentStep={currentStep} />
                    <Form id="newApplication" onSubmit={handleSubmit(onSubmit)}>
                        <>
                            <Route
                                exact
                                path="/applications/new/1"
                                render={(props) => (
                                    <Step1 register={register} errors={errors} {...props} />
                                )}
                            />
                            <Route
                                exact
                                path="/applications/new/2"
                                render={(props) => (
                                    <Step2 register={register} errors={errors} {...props} />
                                )}
                            />
                            <Route
                                exact
                                path="/applications/new/3"
                                render={(props) => (
                                    <Step3 register={register} errors={errors} {...props} />
                                )}
                            />
                        </>
                    </Form>
                </FormSection>
                <ImageSection>
                    <Image
                        aria-hidden={true}
                        src={NewApplicationImage}
                        alt="New Application Image"
                    />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default NewApplication;
