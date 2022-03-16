import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Input/input';
import { Error } from '../../../components/Form/form';
import Button from '../../../components/Button/button';
import Select from '../../../components/Select/Select';
import { interviewTypes } from '../../../interfaces/interviews';

interface Props {
    register: any;
    errors: any;
    isValid: boolean;
}

type Params = {
    id?: string | undefined;
};

function Step1({ register, errors, isValid }: Props) {
    const { id } = useParams<Params>();

    return (
        <>
            <Input
                id="company"
                label="Company *"
                register={register}
                required
                type="text"
                list="companyNames"
            />
            <datalist id="companyNames"></datalist>
            <Error>{errors.company && errors.company.message}</Error>

            <Input
                id="startTime"
                label="What time does the interview begin?"
                register={register}
                required
                type="datetime-local"
            />
            <Error>{errors.startTime && errors.startTime.message}</Error>

            <Select
                id="interviewType"
                label="What type of interview will it be?"
                register={register}
                required
            >
                {interviewTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </Select>
            <Error>{errors.interviewType && errors.interviewType.message}</Error>

            <Button disabled={!isValid} type="submit">
                Finish {id ? 'Editing ' : 'Adding '}Interview
            </Button>
        </>
    );
}

export default Step1;
