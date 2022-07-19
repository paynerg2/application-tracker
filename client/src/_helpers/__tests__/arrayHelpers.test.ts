import { getLastArrayElement, paginate } from '../arrayHelpers';

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

    describe('paginate', () => {
        it('Returns the correct number of elements for a given page size', () => {
            const testData = [1, 2, 3, 4, 5, 6];
            let pageSize = 3;
            const result = paginate(testData, pageSize, 1);
            expect(result.length).toBe(pageSize);

            pageSize = 4;
            const updatedResult = paginate(testData, pageSize, 1);
            expect(updatedResult.length).toBe(pageSize);
        });

        it('Returns the correct requested page of data', () => {
            const testData = [1, 2, 3, 4, 5, 6];
            let pageSize = 3;
            const firstPage = paginate(testData, pageSize, 1);
            expect(firstPage).toEqual([1, 2, 3]);

            const secondPage = paginate(testData, pageSize, 2);
            expect(secondPage).toEqual([4, 5, 6]);
        });

        it('Returns an empty array when given a bad page size', () => {
            const testData = [1, 2, 3, 4, 5, 6];

            // Negative valued page size
            let pageSize = -1;
            expect(paginate(testData, pageSize, 1)).toEqual([]);
        });

        it('Returns an empty array when given a bad page number', () => {
            const testData = [1, 2, 3, 4, 5, 6];
            const pageSize = 3;

            // Zero-valued page number
            let pageNumber = 0;
            expect(paginate(testData, pageSize, pageNumber)).toEqual([]);

            // Negative-valued page number
            pageNumber = -1;
            expect(paginate(testData, pageSize, pageNumber)).toEqual([]);

            // Page number greater than total number of expected pages
            pageNumber = Math.ceil(testData.length / pageSize) + 1;
            expect(paginate(testData, pageSize, pageNumber)).toEqual([]);
        });
    });
});
