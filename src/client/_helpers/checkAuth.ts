import { User } from '../interfaces/user';

export const checkLocalStorageToken = (): boolean => {
    let userToken = window.localStorage.getItem('user');
    if (!userToken) return false;

    let user: User = JSON.parse(userToken);

    return user.token ? true : false;
};
