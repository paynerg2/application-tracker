import { addDays, compareDates, getDateFormattedForDatetimeLocalInput } from '../dateHelpers';

describe('Date Helpers', () => {
    describe('getDateFormattedForDatetimeLocalInput', () => {
        it('Formats a date object correctly as a datetime-local string', () => {
            // This whole thing seems a little contrived, but it's a JS Date object, so...
            const dateString = '2015-03-25T12:00:00';
            const input = new Date(dateString);

            const expectedResult = '2015-03-25T12:00:00';
            const actualResult = getDateFormattedForDatetimeLocalInput(input);
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('addDays', () => {
        it('Adds the specified number of days to a date object', () => {
            const dateString = '2015-03-25';
            const date = new Date(dateString);

            const input1 = 0;
            const input2 = 1;
            const input3 = 10;
            const input4 = -4;

            let expectedResult = new Date('2015-03-25');
            let actualResult = addDays(date, input1);

            expect(actualResult).toEqual(expectedResult);

            expectedResult = new Date('2015-03-26');
            actualResult = addDays(date, input2);

            expect(actualResult).toEqual(expectedResult);

            expectedResult = new Date('2015-04-04');
            actualResult = addDays(date, input3);

            expect(actualResult).toEqual(expectedResult);

            expectedResult = new Date('2015-03-21');
            actualResult = addDays(date, input4);

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('compareDates', () => {
        const smallerDate = new Date('2015-03-01');
        const largerDate = new Date('2015-03-02');

        it('Returns a positive number when second date is later', () => {
            const actualResult = compareDates(smallerDate, largerDate);
            expect(actualResult).toBeGreaterThan(0);
        });

        it('Returns a negative number when the second date is earlier', () => {
            const actualResult = compareDates(largerDate, smallerDate);
            expect(actualResult).toBeLessThan(0);
        });

        it('Returns 0 if the dates are the same', () => {
            const actualResult = compareDates(smallerDate, smallerDate);
            expect(actualResult).toEqual(0);
        });
    });
});
