import React from 'react';
import Input from '../../components/Input/input';
import Select from '../../components/Select/Select';
import { Error } from '../../components/Form/form';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import { degreeLevels } from '../../interfaces/application';
import { useParams } from 'react-router-dom';

interface Props {
    register: any;
    errors: any;
}

type Params = {
    id: string | undefined;
};

function Step2({ register, errors }: Props) {
    const { id } = useParams<Params>();
    const nextStep = id ? `/applications/edit/${id}/3` : '/applications/new/3';

    return (
        <>
            <Input id="location" label="Location *" register={register} required type="text" />
            <Error>{errors.location ? 'Required' : ''}</Error>
            <Input id="mainSkill" label="Main Skill *" register={register} required type="text" />
            <Error>{errors.mainSkill ? 'Required' : ''}</Error>
            <Input
                id="expectedYearsOfExperience"
                label="Expected Years of Experience"
                register={register}
                required={false}
                type="number"
                defaultValue="0"
            />
            <Error>{errors.expectedYearsOfExperience ? 'Required' : ''}</Error>
            <Select
                id="degreeLevel"
                label="Expected Degree Level"
                register={register}
                required={false}
                type="text"
            >
                {degreeLevels.map((degree) => (
                    <option key={degree} value={degree}>
                        {degree}
                    </option>
                ))}
            </Select>
            <Error>{errors.expectedYearsOfExperience ? 'Required' : ''}</Error>
            <Link to={nextStep}>
                <Button>Continue</Button>
            </Link>
        </>
    );
}

export default Step2;
