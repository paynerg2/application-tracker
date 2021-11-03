import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Application } from '../interfaces/application';
import config from '../config.json';
import { Interview } from '../interfaces/interviews';

type ApplicationResponse = Application[];
type InterviewResponse = Interview[];

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
        getApplications: build.query<ApplicationResponse, void>({
            query: () => 'applications',
        }),
        getInterviews: build.query<InterviewResponse, void>({
            query: () => 'interviews',
        }),
    }),
});

export const { useGetApplicationsQuery, useGetInterviewsQuery } = api;
