import React from 'react';
import Input from '../../../components/Input/input';
import { useGetApplicationsQuery } from '../../../services/api';
import { useFormContext } from 'react-hook-form';
import { contactStepTwoValidationSchema as validationSchema } from '../../../_helpers/validators/contactValidationSchema';
import { Contact } from '../../../interfaces/contact';

const defaultValues: Partial<Contact> = {
    company: '',
    position: '',
};

function Step2() {
    const { companyNames, ...rest } = useGetApplicationsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            companyNames: [...new Set(data?.map((a) => a.company))],
        }),
    });
    const { register } = useFormContext();

    return (
        <>
            <Input label="Company" type="text" list="companyNames" {...register('company')} />
            <datalist id="companyNames">
                {companyNames.map((c) => (
                    <option key={c}>{c}</option>
                ))}
            </datalist>

            <Input
                label="What is their position in the company?"
                type="text"
                {...register('position')}
            />
        </>
    );
}

export default {
    Component: Step2,
    defaultValues,
    validationSchema,
    label: 'Step Two',
    key: 'stepTwo',
};
