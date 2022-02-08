// Useful arrays for avoiding magic strings in forms
// Credit to Melvin George's blog for this trick
export const degreeLevels = ['None', 'Associates', 'Bachelors', 'Masters', 'Ph.D'] as const;
export const contractTypes = ['full-time', 'part-time', 'contract', 'contract-to-hire'] as const;
export const responseTypes = ['No Response', 'Rejected', 'Interview'] as const;

export interface Application {
    id: string;
    jobTitle: string;
    company: string;
    jobDescriptionLink: string | null;
    requiredSkillsTotal: number;
    requiredSkillsMet: number;
    additionalSkillsTotal: number;
    additionalSkillsMet: number;
    yearsOfExperience: number;
    degreeLevel: typeof degreeLevels[number];
    contract: typeof contractTypes[number];
    temp: boolean;
    arbitraryRelocation: boolean;
    location: string;
    mainSkill: string;
    datePosted: Date;
    dateApplicationSent: Date;
    givenReferral: boolean;
    companyLinkedIn?: string;
    expectedSalary: number;
    field?: string;
    response: typeof responseTypes[number];
}
