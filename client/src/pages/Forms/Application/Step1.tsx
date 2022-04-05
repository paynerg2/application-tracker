import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../components/Input/input';
import Select from '../../../components/Select/select';
import { Application, contractTypes } from '../../../interfaces/application';
import { capitalizeFirstLetter } from '../../../_helpers/capitalize';
import { applicationStepOneValidationSchema as validationSchema } from '../../../_helpers/validators/applicationValidationSchema';

const defaultValues: Partial<Application> = {
    jobTitle: '',
    company: '',
    contract: contractTypes[0],
};

const Step1 = () => {
    const { register } = useFormContext();
    return (
        <>
            <Input label="Job Title" type="text" {...register('jobTitle')} />
            <Input label="Company Name" type="text" {...register('company')} />
            <Select label="Contract Type" {...register('contract')}>
                {contractTypes.map((contract) => (
                    <option key={contract} value={contract}>
                        {capitalizeFirstLetter(contract)}
                    </option>
                ))}
            </Select>
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
