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
            <Error>{errors.location && errors.location.message}</Error>
            <Input id="mainSkill" label="Main Skill *" register={register} required type="text" />
            <Error>{errors.mainSkill && errors.mainSkill.message}</Error>
            <Input
                id="yearsOfExperience"
                label="Expected Years of Experience"
                register={register}
                required={false}
                type="number"
                defaultValue="0"
            />
            <Error>{errors.expectedSalary && errors.expectedSalary.message}</Error>
            <Input
                id="expectedSalary"
                label="Expected Salary"
                register={register}
                required={false}
                type="number"
                defaultValue="0"
            />
            <Error>{errors.yearsOfExperience && errors.yearsOfExperience.message}</Error>
            <Select
                id="degreeLevel"
                label="Expected Degree Level"
                register={register}
                required={false}
                type="text"
                defaultValue="None"
            >
                {degreeLevels.map((degree) => (
                    <option key={degree} value={degree}>
                        {degree}
                    </option>
                ))}
            </Select>
            <Error>{errors.degreeLevel && errors.degreeLevel.message}</Error>
            <Link to={nextStep}>
                <Button>Continue</Button>
            </Link>
        </>
    );
}

export default Step2;
