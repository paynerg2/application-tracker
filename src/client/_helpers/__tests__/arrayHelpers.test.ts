import { getLastArrayElement } from '../arrayHelpers';

describe('Array Helpers', () => {
    describe('getLastArrayElement', () => {
        it('Returns the last element of a given array', () => {
            const input = [1, 2, 3, 4, 5, 6];
            const expectedResult = 6;

            const actualResult = getLastArrayElement(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns undefined if given an empty array', () => {
            const input: number[] = [];
            const expectedResult = undefined;

            const actualResult = getLastArrayElement(input);
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
