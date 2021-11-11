import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

const initialState = {
    user: '',
    token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
        });
    },
});

export default authSlice.reducer;
