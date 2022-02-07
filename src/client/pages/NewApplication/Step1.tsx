import React from 'react';
import Input from '../../components/Input/input';
import { Error } from '../../components/Form/form';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import Select from '../../components/Select/Select';
import { contractTypes } from '../../interfaces/application';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';

interface Props {
    register: any;
    errors: any;
}

function Step1({ register, errors }: Props) {
    return (
        <>
            <Input id="jobTitle" label="Job Title *" register={register} required type="text" />
            <Error>{errors.jobTitle ? 'Required' : ''}</Error>
            <Input id="company" label="Company Name *" register={register} required type="text" />
            <Error>{errors.company ? 'Required' : ''}</Error>
            <Select id="contract" label="Contract Type" register={register} required={false}>
                {contractTypes.map((contract) => (
                    <option key={contract} value={contract}>
                        {capitalizeFirstLetter(contract)}
                    </option>
                ))}
            </Select>
            <Error>{errors.contract ? 'Required' : ''}</Error>

            <Link to="/applications/new/2">
                {' '}
                <Button>Continue</Button>
            </Link>
        </>
    );
}

export default Step1;
