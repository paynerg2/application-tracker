import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        fullName: '',
        location: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    reducers: {
        setFullName: (state, action) => {
            state.fullName = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
    },
});

export default signupSlice.reducer;

export const { setFullName, setLocation, setEmail, setPassword } = signupSlice.actions;
