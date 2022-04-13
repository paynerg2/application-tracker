import { Application } from '../../../interfaces/application';
import {
    applicationStepOneValidationSchema,
    applicationStepThreeValidationSchema,
    applicationStepTwoValidationSchema,
} from '../applicationValidationSchema';
import { requiredError, negativeNumberError } from '../errorStrings';

describe('Application Validation Schema', () => {
    const validateApplication = async (application: Partial<Application>, step: number) => {
        let error;
        try {
            switch (step) {
                case 1:
                    await applicationStepOneValidationSchema.validate(application);
                    break;
                case 2:
                    await applicationStepTwoValidationSchema.validate(application);
                    break;
                case 3:
                    await applicationStepThreeValidationSchema.validate(application);
                    break;
                default:
                    throw new Error('not a valid step');
            }
        } catch (e) {
            error = e;
        }
        return error;
    };

    /**
     ** jobTitle
     */

    it('Returns an error when the jobTitle field is absent', async () => {
        const testApplication: Partial<Application> = {
            company: 'test',
        };

        const error = await validateApplication(testApplication, 1);
        expect(error.path).toEqual('jobTitle');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** company
     */

    it('Returns an error when the company field is absent', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
        };

        const error = await validateApplication(testApplication, 1);
        expect(error.path).toEqual('company');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** location
     */

    it('Returns an error when the location field is absent', async () => {
        const testApplication: Partial<Application> = {
            mainSkill: 'test',
        };

        const error = await validateApplication(testApplication, 2);
        expect(error.path).toEqual('location');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** requiredSkillsMet
     */

    it('Returns an error when the requiredSkillsMet field is negative', async () => {
        const testApplication: Partial<Application> = {
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: -2,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication, 3);
        expect(error.path).toEqual('requiredSkillsMet');
        expect(error.message).toEqual(negativeNumberError);
    });

    /**
     ** additionalSkillsMet
     */

    it('Returns an error when the additionalSkillsMet field is negative', async () => {
        const testApplication: Partial<Application> = {
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 1,
            additionalSkillsMet: -2,
        };

        const error = await validateApplication(testApplication, 3);
        expect(error.path).toEqual('additionalSkillsMet');
        expect(error.message).toEqual(negativeNumberError);
    });

    /**
     ** mainSkill
     */
    it('Return an error when the mainSkill field is absent', async () => {
        const testApplication: Partial<Application> = {
            location: 'test',
        };

        const error = await validateApplication(testApplication, 2);
        expect(error.path).toEqual('mainSkill');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** expectedSalary
     */
    it('Returns an error when the expectedSalary field is negative', async () => {
        const testApplication: Partial<Application> = {
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
            expectedSalary: -1,
        };

        const error = await validateApplication(testApplication, 2);
        expect(error.path).toEqual('expectedSalary');
        expect(error.message).toEqual(negativeNumberError);
    });
});
