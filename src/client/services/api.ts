import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Application } from '../interfaces/application';
import config from '../config.json';
import { Interview } from '../interfaces/interviews';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl,
        prepareHeaders: (headers) => {
            const storedUser = localStorage.getItem('user');
            let user = null;
            if (typeof storedUser === 'string') {
                user = JSON.parse(storedUser);
            }

            if (user && user.token) {
                headers.set('authorization', `Bearer ${user.token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        getApplications: build.query<Application[], void>({
            query: () => 'applications',
        }),
        addNewApplication: build.mutation<Application, Partial<Application>>({
            query: (initialApplication) => ({
                url: '/applications',
                method: 'POST',
                body: initialApplication,
            }),
        }),
        getInterviews: build.query<Interview[], void>({
            query: () => 'interviews',
        }),
    }),
});

export const { useGetApplicationsQuery, useAddNewApplicationMutation, useGetInterviewsQuery } = api;
