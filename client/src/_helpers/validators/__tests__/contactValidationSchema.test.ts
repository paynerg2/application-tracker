import { Contact } from '../../../interfaces/contact';
import { contactValidationSchema } from '../contactValidationSchema';
import { requiredError, invalidEmail, invalidPhoneNumber } from '../errorStrings';

describe('Contact Validation Schema', () => {
    const validateContact = async (contact: Partial<Contact>) => {
        let error;
        try {
            await contactValidationSchema.validate(contact);
        } catch (e) {
            error = e;
        }
        return error;
    };

    it('Does not reject when all required fields are present', async () => {
        const minimalContact: Partial<Contact> = {
            name: 'test',
            company: 'test',
        };

        const fullContact: Contact = {
            id: 'test',
            name: 'test',
            email: 'test@test.com',
            company: 'test',
            phone: '123-123-1234',
            position: 'test',
        };

        const error = await validateContact(minimalContact);
        const error2 = await validateContact(fullContact);

        expect(error).toBeUndefined();
        expect(error2).toBeUndefined();
    });

    /**
     ** name
     */
    it('Returns an error when the name field is absent', async () => {
        const testContact: Partial<Contact> = {
            company: 'test',
        };

        const error = await validateContact(testContact);
        expect(error.path).toBe('name');
        expect(error.message).toBe(requiredError);
    });

    /**
     ** email
     */
    it('Returns an error when given an input for email that does not match a valid email format', async () => {
        const testContact1: Partial<Contact> = {
            name: 'test',
            email: 'invalid',
            company: 'test',
        };
        const testContact2: Partial<Contact> = {
            name: 'test',
            email: 'invalid@',
            company: 'test',
        };
        const testContact3: Partial<Contact> = {
            name: 'test',
            email: 'invalid@test',
            company: 'test',
        };
        const testContact4: Partial<Contact> = {
            name: 'test',
            email: 'invalid@test.',
            company: 'test',
        };

        const error = await validateContact(testContact1);
        const error2 = await validateContact(testContact2);
        const error3 = await validateContact(testContact3);
        const error4 = await validateContact(testContact4);

        const errors = [error, error2, error3, error4];

        errors.forEach((err) => {
            expect(err.path).toBe('email');
            expect(err.message).toBe(invalidEmail);
        });
    });

    it('Returns an error when given an input for phone which is not a valid phone number format', async () => {
        const minimalContact: Partial<Contact> = {
            name: 'test',
            company: 'test',
            phone: '',
        };
        const testContacts = [1, 2, 3, 4, 5, 6].map((i) => ({
            ...minimalContact,
            phone: `${minimalContact.phone}${i}`,
        }));
        testContacts.forEach(async (contact) => {
            const error = await validateContact(contact);
            expect(error.path).toBe('phone');
            expect(error.message).toBe(invalidPhoneNumber);
        });
    });

    /**
     ** phone
     */

    it('Does not reject any phone number with 7+ digits', () => {
        const minimalContact: Partial<Contact> = {
            name: 'test',
            company: 'test',
            phone: '123456',
        };

        const testContacts = [1, 2, 3, 4].map((i) => ({
            ...minimalContact,
            phone: `${minimalContact.phone}${i}`,
        }));
        testContacts.forEach(async (contact) => {
            const error = await validateContact(contact);
            expect(error).toBeUndefined();
        });
    });

    /**
     ** company
     */
    it('Returns an error if company field is absent', async () => {
        const testContact: Partial<Contact> = {
            name: 'test',
        };

        const error = await validateContact(testContact);
        expect(error.path).toBe('company');
        expect(error.message).toBe(requiredError);
    });
});
