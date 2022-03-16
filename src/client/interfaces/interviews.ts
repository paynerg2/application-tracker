export const interviewTypes = ['On Site', 'Video', 'Phone'] as const;

export interface Interview {
    id: string;
    startTime: Date;
    location: string;
    contact: string;
    company: string;
    followUpSent: boolean;
    response: string;
    offer: number;
    interviewType: typeof interviewTypes[number];
    round: number;
    notes: string;
}
