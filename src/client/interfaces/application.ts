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
    degreeLevel: 'None' | 'Associates' | 'Bachelors' | 'Masters' | 'Ph.D';
    contract: 'full-time' | 'part-time' | 'contract' | 'contract-to-hire';
    temp: boolean;
    arbitraryRelocation: boolean;
    location: string;
    mainSkills: string;
    datePosted: Date;
    dateApplicationSent: Date;
    givenReferral: boolean;
    companyLinkedIn: string;
    expectedSalary: number;
    field: string;
    response: 'No Response' | 'Rejected' | 'Interview';
    interviewId: string[];
}
