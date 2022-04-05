import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

const _user: User = JSON.parse(window.localStorage.getItem('user') || '{}');

const initialState = {
    user: _user,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            window.localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        defaultState: (state) => {
            window.localStorage.clear();
            state.user = {} as User;
        },
    },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
