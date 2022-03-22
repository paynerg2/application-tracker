import * as yup from 'yup';

import { degreeLevels, contractTypes, responseTypes } from '../../interfaces/application';
import { requiredError, negativeNumberError, invalidDate } from './errorStrings';

export const applicationValidationSchema = yup.object({
    jobTitle: yup.string().required(requiredError),
    company: yup.string().required(requiredError),
    location: yup.string().required(requiredError),
    requiredSkillsTotal: yup.number().required(requiredError).min(0, negativeNumberError),
    requiredSkillsMet: yup
        .mixed()
        .required(requiredError)
        .test('nonnegative', negativeNumberError, (value) => value >= 0)
        .test({
            name: 'max',
            exclusive: false,
            params: {},
            message: 'Cannot be greater than total required skills',
            test: function (value) {
                return value! <= parseInt(this.parent.requiredSkillsTotal);
            },
        }),
    additionalSkillsTotal: yup.number().required(requiredError).min(0, negativeNumberError),
    additionalSkillsMet: yup
        .mixed()
        .required(requiredError)
        .test('nonnegative', negativeNumberError, (value) => value >= 0)
        .test({
            name: 'max',
            exclusive: false,
            params: {},
            message: 'Cannot be greater than total additional skills',
            test: function (value) {
                return value! <= parseInt(this.parent.additionalSkillsTotal);
            },
        }),
    degreeLevel: yup.string().oneOf([...degreeLevels]),
    contract: yup.string().oneOf([...contractTypes]),
    temp: yup.boolean().default(false),
    arbitraryRelocation: yup.boolean().default(false),
    mainSkill: yup.string().required(requiredError),
    datePosted: yup
        .date()
        .max(new Date())
        .required(requiredError)
        .default(new Date())
        .typeError(invalidDate),
    dateApplicationSent: yup
        .date()
        .required(requiredError)
        .default(new Date())
        .typeError(invalidDate),
    givenReferral: yup.boolean().default(false),
    companyLinkedIn: yup.string(),
    expectedSalary: yup.number().min(0, negativeNumberError),
    field: yup.string(),
    response: yup.string().oneOf([...responseTypes]),
});
