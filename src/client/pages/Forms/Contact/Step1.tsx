import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Input/input';
import { Error } from '../../../components/Form/form';
import Button from '../../../components/Button/button';

interface Props {
    register: any;
    errors: any;
}

type Params = {
    id?: string | undefined;
};

function Step1({ register, errors }: Props) {
    const navigate = useNavigate();
    const { id } = useParams<Params>();
    const nextStep = id ? `/contacts/edit/${id}/2` : '/contacts/new/2';

    return (
        <>
            <Input id="name" label="Name *" register={register} required type="text" />
            <Error>{errors.name && errors.name.message}</Error>

            <Input id="email" label="Email" register={register} required={false} type="text" />
            <Error>{errors.email && errors.email.message}</Error>

            <Input
                id="phone"
                label="Phone Number"
                register={register}
                required={false}
                type="text"
            />
            <Error>{errors.phone && errors.phone.message}</Error>

            <Button onClick={() => navigate(nextStep)}>Continue</Button>
        </>
    );
}

export default Step1;
