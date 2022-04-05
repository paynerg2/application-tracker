import {
    formatFrequencyMapForPieChart,
    getCalendarDataFromDates,
    getFrequencyFromArray,
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

    describe('formatFrequencyMapForPieChart', () => {
        it('Correctly formats data for use in a Nivo pie chart', () => {
            const input = {
                Javascript: 1,
                Typescript: 2,
                React: 3,
            };
            const expectedResult = [
                {
                    id: 'Javascript',
                    label: 'Javascript',
                    value: 1,
                },
                {
                    id: 'Typescript',
                    label: 'Typescript',
                    value: 2,
                },
                {
                    id: 'React',
                    label: 'React',
                    value: 3,
                },
            ];

            const actualResult = formatFrequencyMapForPieChart(input);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty array if given an empty object as input', () => {
            const actualResult = formatFrequencyMapForPieChart({});
            expect(actualResult).toEqual([]);
        });
    });

    describe('getCalendarDataFromDates', () => {
        it('Generates data for a Nivo calendar chart', () => {
            const dates = [
                new Date('2022-2-01'),
                new Date('2022-2-01'),
                new Date('2022-2-01'),
                new Date('2022-2-22'),
                new Date('2022-2-22'),
                new Date('2022-2-27'),
            ];

            const expectedResult = [
                {
                    day: '2022-02-01',
                    value: 3,
                },
                {
                    day: '2022-02-22',
                    value: 2,
                },
                {
                    day: '2022-02-27',
                    value: 1,
                },
            ];

            const actualResult = getCalendarDataFromDates(dates);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty array if given an empty array as input', () => {
            const actualResult = getCalendarDataFromDates([]);
            expect(actualResult).toEqual([]);
        });
    });
});
