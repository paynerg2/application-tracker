import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Input/input';
import { Error } from '../../../components/Form/form';
import Button from '../../../components/Button/button';
import Link from '../../../components/Link/link';

interface Props {
    register: any;
    errors: any;
}

type Params = {
    id?: string | undefined;
};

function Step1({ register, errors }: Props) {
    const { id } = useParams<Params>();
    const nextStep = id ? `/contacts/edit/${id}/2` : '/contacts/new/2';

    return (
        <>
            <Input id="name" label="Name *" register={register} required type="text" />
            <Error>{errors.name ? 'Required' : ''}</Error>

            <Input id="email" label="Email" register={register} required={false} type="text" />
            <Error>{errors.email ? errors.email : ''}</Error>

            <Input
                id="phone"
                label="Phone Number"
                register={register}
                required={false}
                type="text"
            />
            <Error>{errors.phone ? errors.phone : ''}</Error>

            <Link to={nextStep}>
                <Button>Continue</Button>
            </Link>
        </>
    );
}

export default Step1;
