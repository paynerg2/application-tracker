import * as yup from 'yup';

import { requiredError } from './errorStrings';

const interviewTypes = ['On Site', 'Video', 'Phone'];

export const interviewValidationSchema = yup.object({
    company: yup.string().required(requiredError),
    startTime: yup.date().required(requiredError),
    interviewType: yup.string().oneOf([...interviewTypes]),
});
