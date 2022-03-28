import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../components/Input/input';
import { User } from '../../interfaces/user';
import { userLoginValidationSchema as validationSchema } from '../../_helpers/validators/userValidationSchema';

const defaultValues: Partial<User> & { password: string } = {
    email: '',
    password: '',
};

const Step1 = () => {
    const { register } = useFormContext();

    return (
        <>
            <Input label="Email" type="text" {...register('email')} />
            <Input label="Password" type="password" {...register('password')} />
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
