import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../components/Input/input';
import Select from '../../../components/Select/select';
import { Application, degreeLevels } from '../../../interfaces/application';
import { capitalizeFirstLetter } from '../../../_helpers/capitalize';
import { applicationStepTwoValidationSchema as validationSchema } from '../../../_helpers/validators/applicationValidationSchema';

const defaultValues: Partial<Application> = {
    location: '',
    mainSkill: '',
    yearsOfExperience: 0,
    expectedSalary: 0,
    degreeLevel: degreeLevels[0],
};

const Step2 = () => {
    const { register } = useFormContext();
    return (
        <>
            <Input label="Location" type="text" {...register('location')} />
            <Input label="Main Skill" type="text" {...register('mainSkill')} />
            <Input
                label="Expected Years of Experience"
                type="number"
                {...register('yearsOfExperience')}
            />
            <Input label="Expected Salary" type="number" {...register('expectedSalary')} />
            <Select label="Degree Required" {...register('degreeLevel')}>
                {degreeLevels.map((degreeLevel) => (
                    <option key={degreeLevel} value={degreeLevel}>
                        {capitalizeFirstLetter(degreeLevel)}
                    </option>
                ))}
            </Select>
        </>
    );
};

export default {
    Component: Step2,
    defaultValues,
    validationSchema,
    label: 'Step Two',
    key: 'stepTwo',
};
