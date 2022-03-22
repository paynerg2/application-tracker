import { getDateFormattedForDatetimeLocalInput } from '../dateFormatter';

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
});
