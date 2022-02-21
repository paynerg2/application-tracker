import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Input/input';
import { Error } from '../../../components/Form/form';
import Button from '../../../components/Button/button';
import Link from '../../../components/Link/link';
import Select from '../../../components/Select/Select';

interface Props {
    register: any;
    errors: any;
}

type Params = {
    id?: string | undefined;
};

function Step1({ register, errors }: Props) {
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
            <Error>{errors.company ? 'Required' : ''}</Error>

            <Input
                id="startTime"
                label="What time does the interview begin?"
                register={register}
                required
                type="datetime-local"
            />
            <Error>{errors.startTime ? 'Required' : ''}</Error>

            <Select
                id="interviewType"
                label="What type of interview will it be?"
                register={register}
                required
            >
                <option key="onsite" value="On Site">
                    On Site
                </option>
                <option key="video" value="Video">
                    Video
                </option>
                <option key="phone" value="phone">
                    Phone
                </option>
            </Select>
            <Error>{errors.interviewType ? 'Required' : ''}</Error>

            <Button type="submit">Finish {id ? 'Editing ' : 'Adding '}Interview</Button>
        </>
    );
}

export default Step1;
