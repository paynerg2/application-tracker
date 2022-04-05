import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../components/Input/input';
import { Application } from '../../../interfaces/application';
import { applicationStepThreeValidationSchema as validationSchema } from '../../../_helpers/validators/applicationValidationSchema';
import DatePicker from '../../../components/DatePicker/datePicker';

const defaultValues: Partial<Application> = {
    datePosted: undefined,
    dateApplicationSent: new Date(),
    requiredSkillsTotal: 0,
    requiredSkillsMet: 0,
    additionalSkillsTotal: 0,
    additionalSkillsMet: 0,
};

const Step3 = () => {
    const { register } = useFormContext();
    return (
        <>
            <DatePicker name="datePosted" label="When was the listing posted?" />
            <DatePicker name="dateApplicationSent" label="When did you apply?" />
            <Input
                small
                label="How many required skills are listed?"
                type="number"
                {...register('requiredSkillsTotal')}
            />
            <Input
                small
                label="How many required skills do you have?"
                type="number"
                {...register('requiredSkillsMet')}
            />
            <Input
                small
                label="How many additional skills are listed?"
                type="number"
                {...register('additionalSkillsTotal')}
            />
            <Input
                small
                label="How many additional skills do you have?"
                type="number"
                {...register('additionalSkillsMet')}
            />
        </>
    );
};

export default {
    Component: Step3,
    defaultValues,
    validationSchema,
    label: 'Step Three',
    key: 'stepThree',
};
