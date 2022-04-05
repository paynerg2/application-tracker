import { Application } from './application';
import { Contact } from './contact';
import { Interview } from './interviews';
import { Settings } from './settings';

export interface User {
    email: string;
    hash: string;
    createdDate: Date;
    location?: string;
    fullName: string;
    applications: Application[];
    interviews: Interview[];
    contacts: Contact[];
    settings: Settings;
    cloudinary_id?: string;
    profileImage?: string;
    token?: string;
    __v: number;
    _id: string;
}
