import {
    getFrequencyFromArray,
    formatFrequencyMapForCharting,
    getFrequencyMapForCharting,
} from '../dataAnalysis';

describe('Data Analysis Helpers', () => {
    describe('getFrequencyFromArray', () => {
        it('Generates a frequency map of array elements [number]', () => {
            const input = [1, 2, 3, 4, 1, 2, 3, 5, 2, 4];
            const expectedResult = {
                1: 2,
                2: 3,
                3: 2,
                4: 2,
                5: 1,
            };
            const actualResult = getFrequencyFromArray(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Generates a frequency map of array elements [string]', () => {
            const input = ['buffalo', 'buffalo', 'buffalo', 'test', 'input', 'words', 'test'];
            const expectedResult = {
                buffalo: 3,
                test: 2,
                input: 1,
                words: 1,
            };

            const actualResult = getFrequencyFromArray(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty object if given an empty array', () => {
            const actualResult = getFrequencyFromArray([]);
            expect(actualResult).toEqual({});
        });
    });

    describe('formatFrequencyMapForCharting', () => {
        it('Correctly formats a frequency map for use in a Google Chart', () => {
            const input = {
                buffalo: 3,
                test: 2,
                input: 1,
                words: 1,
            };

            const expectedResult = [
                ['buffalo', input.buffalo],
                ['test', input.test],
                ['input', input.input],
                ['words', input.words],
            ];

            const actualResult = formatFrequencyMapForCharting(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty array if given an empty object as input', () => {
            const input = {};

            const actualResult = formatFrequencyMapForCharting(input);
            expect(actualResult).toEqual([]);
        });
    });

    describe('getFrequencyMapForCharting', () => {
        it('Correctly formats an array into Google Chart-ready data', () => {
            const input = ['buffalo', 'buffalo', 'buffalo', 'test', 'input', 'words', 'test'];
            const expectedResult = [
                ['buffalo', 3],
                ['test', 2],
                ['input', 1],
                ['words', 1],
            ];

            const actualResult = getFrequencyMapForCharting(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty array if given an empty array', () => {
            const actualResult = getFrequencyMapForCharting([]);
            expect(actualResult).toEqual([]);
        });

        it('Calls getFrequencyFromArray', () => {
            const getFrequencyMapForCharting = jest.fn();

            getFrequencyMapForCharting([]);
            expect(getFrequencyMapForCharting.mock.calls.length).toBe(1);
        });

        it('Calls formatFrequencyMapForCharting', () => {
            const formatFrequencyMapForCharting = jest.fn();

            formatFrequencyMapForCharting([]);
            expect(formatFrequencyMapForCharting.mock.calls.length).toBe(1);
        });
    });
});
