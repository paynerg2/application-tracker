import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactFormImage from '../../../assets/Contact_Form_Image.svg';
import Step1 from './Step1';
import Step2 from './Step2';
import {
    useEditContactMutation,
    useAddNewContactMutation,
    useGetContactsQuery,
} from '../../../services/api';
import { Contact } from '../../../interfaces/contact';
import FormPage from '../FormPage';

type RouteParams = {
    id?: string | undefined;
};

const ContactForm = () => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();
    const [addNewContact] = useAddNewContactMutation();
    const [editContact] = useEditContactMutation();
    const { contact, ...rest } = useGetContactsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            contact: data?.find((c) => c.id === id),
        }),
    });

    const header = `${id ? 'Edit' : 'Add'} Contact`;

    const onSubmit = async (data: any) => {
        try {
            if (id) {
                await editContact({ id, ...data });
            } else {
                await addNewContact(data);
            }
        } catch (error) {
            console.log(error);
        }
        navigate('/interviews');
    };
    const handleSubmit = useCallback(onSubmit, []);

    return (
        <>
            {(contact || !id) && (
                <FormPage
                    steps={[Step1, Step2]}
                    image={ContactFormImage}
                    header={header}
                    initialValues={contact ? contact : {}}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export default ContactForm;
