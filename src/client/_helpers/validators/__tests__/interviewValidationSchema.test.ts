import { Interview } from '../../../interfaces/interviews';
import { interviewValidationSchema } from '../interviewValidationSchema';
import { requiredError } from '../errorStrings';

describe('Contact Validation Schema', () => {
    const validateInterview = async (interview: Partial<Interview>) => {
        let error;
        try {
            await interviewValidationSchema.validate(interview);
        } catch (e) {
            error = e;
        }
        return error;
    };

    it('Does not reject when all required fields are present', async () => {
        const minimalInterview: Partial<Interview> = {
            company: 'test',
            startTime: new Date(),
        };

        const error = await validateInterview(minimalInterview);
        expect(error).toBeUndefined();
    });

    it('Returns an error when company field is absent', async () => {
        const testInterview: Partial<Interview> = {
            startTime: new Date(),
        };

        const error = await validateInterview(testInterview);
        expect(error.path).toBe('company');
        expect(error.message).toBe(requiredError);
    });

    it('Returns an error when startTime field is absent', async () => {
        const testInterview: Partial<Interview> = {
            company: 'test',
        };

        const error = await validateInterview(testInterview);
        expect(error.path).toBe('startTime');
        expect(error.message).toBe(requiredError);
    });
});
