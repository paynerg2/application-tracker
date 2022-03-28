import * as yup from 'yup';

import { degreeLevels, contractTypes, responseTypes } from '../../interfaces/application';
import { requiredError, negativeNumberError, invalidDate } from './errorStrings';

export const applicationStepOneValidationSchema = yup.object({
    jobTitle: yup.string().required(requiredError),
    company: yup.string().required(requiredError),
    contract: yup.string().default(contractTypes[0]),
});

export const applicationStepTwoValidationSchema = yup.object({
    location: yup.string().required(requiredError),
    mainSkill: yup.string().required(requiredError),
    yearsOfExperience: yup.number().min(0, negativeNumberError),
    expectedSalary: yup.number().min(0, negativeNumberError),
    degreeLevel: yup.string().oneOf([...degreeLevels]),
});

export const applicationStepThreeValidationSchema = yup.object({
    datePosted: yup.date().typeError(invalidDate).required(requiredError),
    dateApplicationSent: yup.date().typeError(invalidDate).default(new Date()),
    requiredSkillsTotal: yup.number().typeError('').min(0, negativeNumberError),
    requiredSkillsMet: yup.number().typeError('').min(0, negativeNumberError),
    additionalSkillsTotal: yup.number().typeError('').min(0, negativeNumberError),
    additionalSkillsMet: yup.number().typeError('').min(0, negativeNumberError),
});

export const applicationValidationSchema = yup.object({
    jobTitle: yup.string().required(requiredError),
    company: yup.string().required(requiredError),
    location: yup.string().required(requiredError),
    // requiredSkillsTotal: yup
    //     .number()
    //     .required(requiredError)
    //     .default(0)
    //     .min(0, negativeNumberError),
    // requiredSkillsMet: yup
    //     .mixed()
    //     .required(requiredError)
    //     .default(0)
    //     .test('nonnegative', negativeNumberError, (value) => value >= 0)
    //     .test({
    //         name: 'max',
    //         exclusive: false,
    //         params: {},
    //         message: 'Cannot be greater than total required skills',
    //         test: function (value) {
    //             return value! <= parseInt(this.parent.requiredSkillsTotal);
    //         },
    //     }),
    // additionalSkillsTotal: yup
    //     .number()
    //     .required(requiredError)
    //     .default(0)
    //     .min(0, negativeNumberError),
    // additionalSkillsMet: yup
    //     .mixed()
    //     .required(requiredError)
    //     .default(0)
    //     .test('nonnegative', negativeNumberError, (value) => value >= 0)
    //     .test({
    //         name: 'max',
    //         exclusive: false,
    //         params: {},
    //         message: 'Cannot be greater than total additional skills',
    //         test: function (value) {
    //             return value! <= parseInt(this.parent.additionalSkillsTotal);
    //         },
    //     }),
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
