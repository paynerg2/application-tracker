import { capitalizeFirstLetter } from '../capitalize';

describe('Capitalize', () => {
    describe('capitalizeFirstLetter', () => {
        it('Capitalizes the first letter of a given string', () => {
            const input = 'lowercase';
            const expectedResult = 'Lowercase';
            const actualResult = capitalizeFirstLetter(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty string if given an empty string', () => {
            const actualResult = capitalizeFirstLetter('');
            expect(actualResult).toEqual('');
        });

        it('Returns the input if the first letter is not a member of the alphabet', () => {
            const input = '#hashtag';
            const expectedResult = input;
            const actualResult = capitalizeFirstLetter(input);
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
