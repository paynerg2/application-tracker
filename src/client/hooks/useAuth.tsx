import React, { useState } from 'react';
import { User } from '../interfaces/user';
import { useLoginMutation } from '../services/authApi';
import { getCurrentUser } from '../_helpers/getCurrentUser';

interface IAuthContext {
    user: User | undefined;
    login: (data: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext({} as IAuthContext);

interface Props {
    children?: React.ReactChild | React.ReactChild[];
}
export const AuthProvider = ({ children }: Props) => {
    const [loginMutation] = useLoginMutation();
    const [user, setUser] = useState<User | undefined>(getCurrentUser());

    const handleLogin = async (data: any) => {
        try {
            const loginResponse = await loginMutation(data).unwrap();
            if (window !== undefined) {
                window.localStorage.setItem('user', JSON.stringify(loginResponse));
            }
            const _currentUser = getCurrentUser();
            console.log(`login callback: ${JSON.stringify(_currentUser)}`);
            setUser(_currentUser);
        } catch (error) {
            //todo: logging and other error handling
            console.log(error);
        }
    };

    const handleLogout = () => {
        if (window !== undefined) {
            window.localStorage.removeItem('user');
        }
        setUser(undefined);
    };

    const value = {
        user,
        login: handleLogin,
        logout: handleLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
