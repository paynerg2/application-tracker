import { Application } from '../interfaces/application';
import { ApplicationFilters } from '../pages/Applications/Applications';

export interface GroupedApplications {
    [date: string]: Application[];
}

/**
 * Helper function for transforming application data into the format expected for
 * displaying the Card View on the applications page.
 *
 * @param applications Array of applications to be indexed
 * @param sortDescending Dictates the sort direction for date indices
 * @returns Applications indexed by dateApplicationSent property
 * as a date string of the format 'Mon DD, YYYY'
 * */
const groupApplicationsByDate = (
    applications: Application[],
    sortDescending = true
): GroupedApplications => {
    return applications.reduce(function (r: any, a: Application) {
        const dateString = new Date(a.dateApplicationSent).toLocaleDateString('default', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        r[dateString] = r[dateString] || [];
        r[dateString].push(a);
        return r;
    }, Object.create(null));
};

/**
 * Helper function for filtering applications based on the response, mainSkill and location
 * properties. Not intended as a general filtering function
 * responses filter exclusively
 * mainSkills filter inclusively
 * locations filter exclusively
 * All filters are done with exact matches
 * @param applications A list of applications to be filtered
 * @param filters A list of filters, restricted to values corresponding to mainSkills and locations
 * @returns A list of applications which meet the filtering requirements
 */
const filterApplications = (applications: Application[], filters: ApplicationFilters) => {
    console.log('filters');
    console.log(filters);
    if (filters.response === 'Open') {
        applications = applications.filter((a) => a.response.toLocaleLowerCase() !== 'rejected');
    }

    if (filters.remoteOnly) {
        applications = applications.filter((a) => a.location.toLowerCase() === 'remote');
    }

    if (filters.skills.length > 0) {
        applications = applications.filter((a) => filters.skills.includes(a.mainSkill));
    }

    if (!filters.remoteOnly && filters.locations.length > 0) {
        applications = applications.filter((a) => filters.locations.includes(a.location));
    }

    return applications;
};

export const applicationHelpers = {
    groupApplicationsByDate,
    filterApplications,
};
