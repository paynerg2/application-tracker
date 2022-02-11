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
    tagTypes: ['Applications', 'User', 'Interviews', 'Contacts'],
    endpoints: (build) => ({
        getApplications: build.query<Application[], void>({
            query: () => 'applications',
            providesTags: ['Applications'],
        }),
        addNewApplication: build.mutation<Application, Partial<Application>>({
            query: (initialApplication) => ({
                url: '/applications',
                method: 'POST',
                body: initialApplication,
            }),
            invalidatesTags: ['Applications'],
        }),
        editApplication: build.mutation<Application, Partial<Application>>({
            query: (application) => ({
                url: `/applications/${application.id}`,
                method: 'PUT',
                body: application,
            }),
            invalidatesTags: ['Applications'],
        }),
        deleteApplication: build.mutation<void, string>({
            query: (id) => ({
                url: `/applications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Applications'],
        }),
        getInterviews: build.query<Interview[], void>({
            query: () => 'interviews',
            providesTags: ['Interviews'],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useAddNewApplicationMutation,
    useEditApplicationMutation,
    useDeleteApplicationMutation,
    useGetInterviewsQuery,
} = api;
