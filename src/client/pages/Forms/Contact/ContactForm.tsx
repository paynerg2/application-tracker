import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    FormHeader,
    Layout,
    Container,
    FormSection,
    ImageSection,
    Image,
    Form,
} from '../../../components/Form/form';
import Stepper from '../../../components/Form/stepper';
import { getLastArrayElement } from '../../../_helpers/arrayHelpers';
import ContactFormImage from '../../../assets/Contact_Form_Image.svg';
import Step1 from './Step1';
import Step2 from './Step2';
import {
    useEditContactMutation,
    useAddNewContactMutation,
    useGetContactsQuery,
} from '../../../services/api';
import { hasKey } from '../../../_helpers/objectHelpers';
import { Contact } from '../../../interfaces/contact';
import { useYupValidationResolver } from '../../../_helpers/useYupValidationResolver';
import { contactValidationSchema } from '../../../_helpers/validators/contactValidationSchema';

interface Props {
    isEdit?: boolean;
}

type RouteParams = {
    id?: string | undefined;
};

function ContactForm({ isEdit = false }: Props) {
    const resolver = useYupValidationResolver(contactValidationSchema);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<Partial<Contact>>({ resolver, mode: 'onTouched' });
    const navigate = useNavigate();

    const [addNewContact] = useAddNewContactMutation();
    const [editContact] = useEditContactMutation();

    const { id } = useParams<RouteParams>();
    const { contact, ...rest } = useGetContactsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            contact: data?.find((c) => c.id === id),
        }),
    });

    const location = useLocation();
    const step = parseInt(getLastArrayElement(location.pathname.split('/')));

    useEffect(() => {
        // Pre-fill form if editing
        const formFields = ['name', 'email', 'phone', 'company', 'position'];

        if (!contact) return;

        formFields.forEach((field) => {
            if (hasKey(contact, field)) {
                setValue(field, contact[field]);
            }
        });
    }, [contact]);

    const onSubmit = async (data: any) => {
        console.log(data);
        const submission = id ? { ...data, id } : { ...data };

        try {
            if (isEdit && id) {
                await editContact(submission);
            } else {
                await addNewContact(submission);
            }
        } catch (error) {
            console.log(error);
            // todo: build out error response
        }

        navigate('/applications');
    };

    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>{isEdit ? 'Edit ' : 'Add a New '}Contact</FormHeader>
                    <Stepper steps={2} currentStep={step} baseRoute="/contacts/new" />
                    <Form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                        <Routes>
                            <Route
                                path="1"
                                element={<Step1 register={register} errors={errors} />}
                            />
                            <Route
                                path="2"
                                element={
                                    <Step2 register={register} errors={errors} isValid={isValid} />
                                }
                            />
                        </Routes>
                    </Form>
                </FormSection>
                <ImageSection>
                    <Image aria-hidden={true} src={ContactFormImage} alt="Contact Form Image" />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default ContactForm;
