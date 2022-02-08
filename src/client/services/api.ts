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
        // todo: Probably need to add tags and invalidate the applications tag on delete so that it refreshes the cache
        deleteApplication: build.mutation<void, string>({
            query: (id) => ({
                url: `/applications/${id}`,
                method: 'DELETE',
            }),
        }),
        getInterviews: build.query<Interview[], void>({
            query: () => 'interviews',
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useAddNewApplicationMutation,
    useDeleteApplicationMutation,
    useGetInterviewsQuery,
} = api;
