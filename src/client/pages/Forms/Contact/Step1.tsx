import React from 'react';
import Input from '../../../components/Input/input';
import { Contact } from '../../../interfaces/contact';
import { useFormContext } from 'react-hook-form';
import { contactStepOneValidationSchema as validationSchema } from '../../../_helpers/validators/contactValidationSchema';

const defaultValues: Partial<Contact> = {
    name: '',
    email: '',
    phone: '',
};

const Step1 = () => {
    const { register } = useFormContext();

    return (
        <>
            <Input label="Name" type="text" {...register('name')} />
            <Input label="Email" type="text" {...register('email')} />
            <Input label="Phone Number" type="text" {...register('phone')} />
        </>
    );
};

export default {
    Component: Step1,
    defaultValues,
    validationSchema,
    label: 'Step One',
    key: 'stepOne',
};
