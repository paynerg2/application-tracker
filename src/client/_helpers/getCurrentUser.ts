import { User } from '../interfaces/user';
import { checkLocalStorageToken } from './checkAuth';

export const getCurrentUser = (): User | undefined => {
    let userToken = undefined;
    if (checkLocalStorageToken()) {
        userToken = window.localStorage.getItem('user');
    }

    return userToken ? (JSON.parse(userToken) as User) : undefined;
};
