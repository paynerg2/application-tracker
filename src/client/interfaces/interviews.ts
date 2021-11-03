export interface Interview {
    id: string;
    applicationId: string;
    startTime: Date;
    location: string;
    contact: string;
    followUpSent: boolean;
    response: string;
    offer: number;
    interviewType: string;
    round: number;
    notes: string;
}
