import { Application } from '../interfaces/application';

// TODO: UNIT TEST

export interface GroupedApplications {
    [date: string]: Application[];
}

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

const filterApplications = (applications: Application[], filters: string[]) => {
    if (filters.includes('Remote')) {
        applications = applications.filter((a) => a.location.toLowerCase() === 'remote');
        filters = filters.filter((f) => f !== 'Remote');
    }

    if (filters.includes('Open')) {
        applications = applications.filter((a) => a.response !== 'Rejected');
        filters = filters.filter((f) => f !== 'Open');
    }

    if (filters.length === 0) {
        return applications;
    }

    return applications.filter((a) => filters.includes(a.mainSkill));
};

export const applicationHelpers = {
    groupApplicationsByDate,
    filterApplications,
};
