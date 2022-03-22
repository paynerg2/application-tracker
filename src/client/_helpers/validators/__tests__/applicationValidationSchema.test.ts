import { Application } from '../../../interfaces/application';
import { applicationValidationSchema } from '../applicationValidationSchema';
import { requiredError, negativeNumberError } from '../errorStrings';
import { degreeLevels, contractTypes, responseTypes } from '../../../interfaces/application';

describe('Application Validation Schema', () => {
    const validateApplication = async (application: Partial<Application>) => {
        let error;
        try {
            await applicationValidationSchema.validate(application);
        } catch (e) {
            error = e;
        }
        return error;
    };

    it('Does not reject when all required fields are present', async () => {
        // Minimal required fields
        const minimalApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        // All fields present
        const fullApplication: Application = {
            id: 'test',
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 2,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 2,
            degreeLevel: degreeLevels[0],
            contract: contractTypes[0],
            temp: false,
            arbitraryRelocation: false,
            givenReferral: false,
            companyLinkedIn: 'test',
            expectedSalary: 0,
            field: 'test',
            response: responseTypes[0],
            jobDescriptionLink: 'test',
            yearsOfExperience: 0,
        };

        const error = await validateApplication(minimalApplication);
        const error2 = await validateApplication(fullApplication);

        expect(error).toBeUndefined();
        expect(error2).toBeUndefined();
    });

    /**
     ** jobTitle
     */

    it('Returns an error when the jobTitle field is absent', async () => {
        const testApplication: Partial<Application> = {
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('jobTitle');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** company
     */

    it('Returns an error when the company field is absent', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('company');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** location
     */

    it('Returns an error when the location field is absent', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('location');
        expect(error.message).toEqual(requiredError);
    });

    //! Note: Due to the dependency between the values of __skillsMet && __skillsTotal
    //! the errors for __skillsMet will always throw before __skillsTotal, removing the possibility
    //! of required or nonnegative errors for this property to fail validation, because those scenarios
    //! will always result in a failure of the custom 'max' test for __skillsMet.

    /**
     ** requiredSkillsMet
     */

    it('Returns an error when the requiredSkillsMet field is absent', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('requiredSkillsMet');
        expect(error.message).toEqual(requiredError);
    });

    it('Returns an error when the requiredSkillsMet field is negative', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: -1,
            requiredSkillsMet: -2,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('requiredSkillsMet');
        expect(error.message).toEqual(negativeNumberError);
    });

    /**
     ** additionalSkillsMet
     */

    it('Returns an error when the additionalSkillsMet field is absent', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('additionalSkillsMet');
        expect(error.message).toEqual(requiredError);
    });

    it('Returns an error when the additionalSkillsMet field is negative', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: -1,
            additionalSkillsMet: -2,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('additionalSkillsMet');
        expect(error.message).toEqual(negativeNumberError);
    });

    /**
     ** mainSkill
     */
    it('Return an error when the mainSkill field is absent', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('mainSkill');
        expect(error.message).toEqual(requiredError);
    });

    /**
     ** expectedSalary
     */
    it('Returns an error when the expectedSalary field is negative', async () => {
        const testApplication: Partial<Application> = {
            jobTitle: 'test',
            company: 'test',
            location: 'test',
            mainSkill: 'test',
            datePosted: new Date('2-22-2022'),
            dateApplicationSent: new Date('2-22-2022'),
            requiredSkillsTotal: 3,
            requiredSkillsMet: 3,
            additionalSkillsTotal: 3,
            additionalSkillsMet: 3,
            expectedSalary: -1,
        };

        const error = await validateApplication(testApplication);
        expect(error.path).toEqual('expectedSalary');
        expect(error.message).toEqual(negativeNumberError);
    });
});
