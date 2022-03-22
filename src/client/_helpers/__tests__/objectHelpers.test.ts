import { hasKey, isEmpty } from '../objectHelpers';

describe('Object Helper Functions', () => {
    describe('hasKey', () => {
        const object = {
            buffalo: 'buffalo',
            words: 'input',
            input: 'words',
        };

        it('Returns false if the obejct does not contain the key', () => {
            const key = 'test';

            const actualResult = hasKey(object, key);
            expect(actualResult).toBe(false);
        });

        it('Returns true if the object does contain the key', () => {
            const key = 'buffalo';

            const actualResult = hasKey(object, key);
            expect(actualResult).toBe(true);
        });

        it('Returns false if the key is an empty string', () => {
            const actualResult = hasKey(object, '');
            expect(actualResult).toBe(false);
        });

        it('Returns false if the object is an empty object', () => {
            expect(hasKey({}, 'key')).toBe(false);
            expect(hasKey({}, 'test')).toBe(false);
            expect(hasKey({}, '')).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('Returns true if given an empty object', () => {
            expect(isEmpty({})).toBe(true);
        });

        it('Returns false if given any non-empty object', () => {
            const input = {
                0: 0,
            };

            const actualResult = isEmpty(input);
            expect(actualResult).toBe(false);
        });
    });
});
