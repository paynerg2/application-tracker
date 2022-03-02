import { Application } from './application';
import { Contact } from './contact';
import { Interview } from './interviews';

export interface User {
    email: string;
    hash: string;
    createdDate: Date;
    location?: string;
    fullName: string;
    applications: Application[];
    interviews: Interview[];
    contacts: Contact[];
    cloudinary_id?: string;
    profileImage?: string;
    token: string;
    __v: number;
    _id: string;
}
