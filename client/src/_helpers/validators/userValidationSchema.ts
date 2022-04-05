import * as yup from 'yup';
import { invalidEmail, invalidURI, invalidURL, requiredError } from './errorStrings';

const URIRegex =
    /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i;

export const userLoginValidationSchema = yup.object({
    email: yup.string().email(invalidEmail).required(requiredError),
    password: yup.string().required(requiredError),
});
export const userRegistrationValidationSchema = userLoginValidationSchema.shape({
    fullName: yup.string().required(requiredError),
});

export const userProfileInfoValidationSchema = yup.object({
    fullName: yup.string().required(requiredError),
    email: yup.string().email(invalidEmail).required(requiredError),
    location: yup.string(),
});

export const userValidationSchema = yup.object({
    email: yup.string().email(invalidEmail).required(requiredError),
    location: yup.string(),
    profileImage: yup.lazy((value) =>
        // If string starts with data, test as a dataURI, otherwise as a URL
        /^data/.test(value)
            ? yup.string().matches(URIRegex, invalidURI)
            : yup.string().url(invalidURL)
    ),
});
