import { Application } from '../../interfaces/application';
import { applicationHelpers } from '../applicationHelpers';
import { applications } from '../../_testing/utils/testData';
import { ApplicationFilters } from '../../pages/Applications/Applications';

const { groupApplicationsByDate, filterApplications } = applicationHelpers;

describe('Application Helpers', () => {
    describe('groupApplicationsByDate', () => {
        it('Returns an empty object if input is an empty array', () => {
            const emptyArray: Application[] = [];

            const groupedApplications = groupApplicationsByDate(emptyArray);
            expect(groupedApplications).toEqual({});
        });

        it('Indexes applications by date submitted [4 items]', () => {
            const expectedResult = {
                'Jan 15, 2022': [applications[0], applications[3]],
                'Jan 17, 2022': [applications[1], applications[2]],
            };

            const actualResult = groupApplicationsByDate(applications);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Indexes applications by date submitted [1 item]', () => {
            const input = [applications[0]];

            const expectedResult = {
                'Jan 15, 2022': [applications[0]],
            };

            const actualResult = groupApplicationsByDate(input);
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('filterApplications', () => {
        const defaultFilters: ApplicationFilters = {
            response: '',
            remoteOnly: false,
            locations: [],
            skills: [],
        };

        it('Returns the entire array unaltered if given default filters [data nonempty]', () => {
            const actualResult = filterApplications(applications, defaultFilters);
            expect(actualResult).toEqual(applications);
        });

        it('Returns the entire array unaltered if there are no filters [empty data array]', () => {
            const expectedResult: Application[] = [];

            const actualResult = filterApplications([] as Application[], defaultFilters);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Returns an empty array if the input array is empty', () => {
            const testFilters = ['Javascript', 'Typescript', 'React'];
            const filters = { ...defaultFilters, skills: testFilters };
            const expectedResult: Application[] = [];

            const actualResult = filterApplications([] as Application[], filters);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Filters exclusively by location', () => {
            let locationFilters = ['Charlotte, NC'];
            let expectedResult = [applications[1]];
            let filters = { ...defaultFilters, locations: locationFilters };

            let actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);

            locationFilters = ['Chapel Hill, NC'];
            filters = { ...defaultFilters, locations: locationFilters };
            expectedResult = [applications[2]];
            actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);

            locationFilters = ['Chapel Hill, NC', 'Charlotte, NC'];
            filters = { ...defaultFilters, locations: locationFilters };
            expectedResult = [applications[1], applications[2]];
            actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);

            locationFilters = ['Cary, NC'];
            filters = { ...defaultFilters, locations: locationFilters };
            expectedResult = [];
            actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Filters inclusively by mainSkill', () => {
            let skillFilters = ['Javascript'];
            let filters = { ...defaultFilters, skills: skillFilters };
            let expectedResult: Application[] = [];

            let actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);

            skillFilters.push('React');
            filters = { ...defaultFilters, skills: skillFilters };
            actualResult = filterApplications(applications, filters);
            expectedResult = [applications[0], applications[1]];
            expect(actualResult).toEqual(expectedResult);

            skillFilters.push('csharp');
            filters = { ...defaultFilters, skills: skillFilters };
            actualResult = filterApplications(applications, filters);
            expectedResult.push(applications[2]);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Filters exclusively for remote positions', () => {
            const filters = { ...defaultFilters, remoteOnly: true, skills: ['React'] };
            const expectedResult = [applications[0]];

            const actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Filters exclusively for open positions', () => {
            const filters = { ...defaultFilters, response: 'Open' };
            const expectedResult = [applications[0], applications[1], applications[3]];

            const actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);
        });

        it('Filters as expected for a combination of: location, mainSkill', () => {
            const filters = { ...defaultFilters, locations: ['Charlotte, NC'], skills: ['React'] };
            const expectedResult = [applications[1]];

            const actualResult = filterApplications(applications, filters);
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
