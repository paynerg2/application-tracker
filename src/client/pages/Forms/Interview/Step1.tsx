import React from 'react';
import Input from '../../../components/Input/input';
import Select from '../../../components/Select/select';
import { Interview, interviewTypes } from '../../../interfaces/interviews';
import { useFormContext } from 'react-hook-form';
import DatePicker from '../../../components/DatePicker/datePicker';
import { interviewValidationSchema as validationSchema } from '../../../_helpers/validators/interviewValidationSchema';

const defaultValues: Partial<Interview> = {
    company: '',
    startTime: undefined,
    interviewType: interviewTypes[0],
};

const Step1 = () => {
    const { register } = useFormContext();

    return (
        <>
            <Input label="Company *" type="text" list="companyNames" {...register('company')} />
            <datalist id="companyNames"></datalist>

            <DatePicker
                label="What time does the interview begin?"
                type="datetime-local"
                dateFormat="MMMM dd, hh:mm a"
                showTimeSelect
                {...register('startTime')}
            />

            <Select label="What type of interview will it be?" {...register('interviewType')}>
                {interviewTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
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
