import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Input/input';
import { Error } from '../Form/form';
import Button from '../Button/button';
import Link from '../Link/link';
import Select from '../Select/Select';
import { contractTypes } from '../../interfaces/application';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';

interface Props {
    register: any;
    errors: any;
}

type Params = {
    id?: string | undefined;
};

function Step1({ register, errors }: Props) {
    const { id } = useParams<Params>();
    const navigate = useNavigate();
    const nextStep = id ? `/applications/edit/${id}/2` : '/applications/new/2';

    return (
        <>
            <Input id="jobTitle" label="Job Title *" register={register} required type="text" />
            <Error>{errors.jobTitle && errors.jobTitle.message}</Error>
            <Input id="company" label="Company Name *" register={register} required type="text" />
            <Error>{errors.company && errors.company.message}</Error>
            <Select id="contract" label="Contract Type" register={register} required={false}>
                {contractTypes.map((contract) => (
                    <option key={contract} value={contract}>
                        {capitalizeFirstLetter(contract)}
                    </option>
                ))}
            </Select>
            <Error>{errors.contract && errors.contract.message}</Error>

            <Button onClick={() => navigate(nextStep)}>Continue</Button>
        </>
    );
}

export default Step1;
