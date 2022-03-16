import { Application } from '../../interfaces/application';
import { Contact } from '../../interfaces/contact';
import { Interview } from '../../interfaces/interviews';

export const applications: Application[] = [
    {
        id: '2',
        jobTitle: 'Software Developer',
        company: 'Startup Co.',
        jobDescriptionLink: null,
        requiredSkillsTotal: 10,
        requiredSkillsMet: 5,
        additionalSkillsTotal: 5,
        additionalSkillsMet: 3,
        yearsOfExperience: 2,
        degreeLevel: 'Bachelors',
        contract: 'full-time',
        temp: false,
        arbitraryRelocation: false,
        location: 'Remote',
        mainSkill: 'React',
        datePosted: new Date('January 1, 2022, 00:00:00'),
        dateApplicationSent: new Date('January 15, 2022, 4:00:00'),
        givenReferral: false,
        companyLinkedIn: 'linkedin.com/startupco',
        expectedSalary: 65000,
        field: 'web development',
        response: 'No Response',
    },
    {
        id: '1',
        jobTitle: 'Junior Web Developer',
        company: 'Tech Company, LLC',
        jobDescriptionLink: null,
        requiredSkillsTotal: 10,
        requiredSkillsMet: 5,
        additionalSkillsTotal: 5,
        additionalSkillsMet: 3,
        yearsOfExperience: 2,
        degreeLevel: 'Bachelors',
        contract: 'full-time',
        temp: false,
        arbitraryRelocation: false,
        location: 'Charlotte, NC',
        mainSkill: 'React',
        datePosted: new Date('January 1, 2022, 00:00:00'),
        dateApplicationSent: new Date('January 17, 2022, 05:00:00'),
        givenReferral: false,
        companyLinkedIn: 'linkedin.com/techcompanyllc',
        expectedSalary: 60000,
        field: 'web development',
        response: 'No Response',
    },
    {
        id: '3',
        jobTitle: 'UI Developer',
        company: 'Code Company',
        jobDescriptionLink: null,
        requiredSkillsTotal: 10,
        requiredSkillsMet: 5,
        additionalSkillsTotal: 5,
        additionalSkillsMet: 3,
        yearsOfExperience: 2,
        degreeLevel: 'Bachelors',
        contract: 'full-time',
        temp: false,
        arbitraryRelocation: false,
        location: 'Chapel Hill, NC',
        mainSkill: 'csharp',
        datePosted: new Date('January 1, 2022, 00:00:00'),
        dateApplicationSent: new Date('January 17, 2022, 06:00:00'),
        givenReferral: false,
        companyLinkedIn: 'linkedin.com/codecompany',
        expectedSalary: 70000,
        field: 'web development',
        response: 'No Response',
    },
    {
        id: '4',
        jobTitle: 'Web Developer',
        company: 'Internet Co.',
        jobDescriptionLink: null,
        requiredSkillsTotal: 10,
        requiredSkillsMet: 5,
        additionalSkillsTotal: 5,
        additionalSkillsMet: 3,
        yearsOfExperience: 2,
        degreeLevel: 'Bachelors',
        contract: 'full-time',
        temp: false,
        arbitraryRelocation: false,
        location: 'Remote',
        mainSkill: 'angular',
        datePosted: new Date('January 1, 2022, 00:00:00'),
        dateApplicationSent: new Date('January 15, 2022, 11:00:00'),
        givenReferral: false,
        companyLinkedIn: 'linkedin.com/internetco',
        expectedSalary: 60000,
        field: 'web development',
        response: 'No Response',
    },
];
const uniqueMainSkills = applications.reduce(function (r: Set<string>, a: Application) {
    r.add(a.mainSkill);
    return r;
}, new Set<string>());

export const mainSkills = Array.from(uniqueMainSkills);

const remoteJobsCount = applications.reduce(function (r, a) {
    const isRemote = a.location.toLocaleLowerCase() === 'remote';
    return isRemote ? r + 1 : r;
}, 0);

const openSubmissions = applications.reduce(function (r, a) {
    const isOpen = a.response.toLocaleLowerCase() !== 'interview';
    return isOpen ? r + 1 : r;
}, 0);

export const groupedApplications = applications.reduce(function (r: any, a: Application) {
    const dateString = a.dateApplicationSent.toLocaleDateString('default', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
    r[dateString] = r[dateString] || [];
    r[dateString].push(a);
    return r;
}, Object.create(null));

export const interviews: Interview[] = [
    {
        id: '1',
        startTime: new Date('02/08/2022'),
        location: 'Raleigh, NC',
        contact: 'Susan Storm',
        company: 'Future Foundation',
        followUpSent: false,
        response: 'No Response',
        offer: 0,
        interviewType: 'On-Site',
        round: 2,
        notes: '',
    },
    {
        id: '2',
        startTime: new Date('02/08/2022'),
        location: 'Cary, NC',
        contact: 'Reed Richards',
        company: 'Future Foundation',
        followUpSent: false,
        response: 'No Response',
        offer: 0,
        interviewType: 'Remote',
        round: 1,
        notes: '',
    },
    {
        id: '3',
        startTime: new Date('02/08/2022'),
        location: 'Chapel Hill, NC',
        contact: 'Ben Grimm',
        company: 'Future Foundation',
        followUpSent: false,
        response: 'No Response',
        offer: 0,
        interviewType: 'Phone',
        round: 1,
        notes: '',
    },
];

export const contacts: Contact[] = [
    {
        id: '1',
        name: 'Susan Storm',
        email: 'SStorm@FF.com',
        company: 'Future Foundation',
        phone: '444-444-4444',
        position: 'Tech Lead',
    },
    {
        id: '2',
        name: 'Reed Richards',
        company: 'Future Foundation',
        email: 'MrFantastic@FF.com',
        phone: '444-444-4444',
        position: 'CEO',
    },
    {
        id: '3',
        name: 'Ben Grimm',
        company: 'Future Foundation',
        email: 'BlueEyedThing@FF.com',
        phone: '444-444-4444',
        position: 'Bodyguard',
    },
];
