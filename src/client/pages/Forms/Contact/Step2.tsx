import React from 'react';
import Input from '../../../components/Input/input';
import { Error } from '../../../components/Form/form';
import Button from '../../../components/Button/button';
import { useGetApplicationsQuery } from '../../../services/api';

interface Props {
    register: any;
    errors: any;
    isValid: boolean;
}

function Step2({ register, errors, isValid }: Props) {
    const { companyNames, ...rest } = useGetApplicationsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            companyNames: [...new Set(data?.map((a) => a.company))],
        }),
    });

    return (
        <>
            <Input
                id="company"
                label="Company Name"
                register={register}
                required
                type="text"
                list="companyNames"
            />
            <datalist id="companyNames">
                {companyNames.map((c) => (
                    <option key={c}>{c}</option>
                ))}
            </datalist>
            <Error>{errors.company && errors.company.message}</Error>

            <Input
                id="position"
                label="What is their position in the company?"
                register={register}
                required={false}
                type="text"
            />
            <Error>{errors.position && errors.position.message}</Error>

            <Button disabled={!isValid} type="submit">
                Continue
            </Button>
        </>
    );
}

export default Step2;
