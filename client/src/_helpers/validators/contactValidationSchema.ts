import * as yup from 'yup';

import { requiredError, invalidEmail, invalidPhoneNumber } from './errorStrings';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const contactStepOneValidationSchema = yup.object({
    name: yup.string().required(requiredError),
    email: yup.string().email(invalidEmail),
    phone: yup
        .string()
        .matches(phoneRegExp, { excludeEmptyString: true, message: invalidPhoneNumber }),
});

export const contactStepTwoValidationSchema = yup.object({
    company: yup.string().required(requiredError),
    position: yup.string(),
});

export const contactValidationSchema = yup.object({
    name: yup.string().required(requiredError),
    email: yup.string().email(invalidEmail),
    phone: yup.string().matches(phoneRegExp, invalidPhoneNumber),
    company: yup.string().required(requiredError),
    position: yup.string(),
});
