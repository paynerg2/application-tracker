import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config.json';
import { LoginForm, LoginResponse } from '../../types';

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${config.apiUrl}/` }),
    reducerPath: 'authApi',
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginForm>({
            query: (credentials) => ({
                url: 'users/authenticate',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
