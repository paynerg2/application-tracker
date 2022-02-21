import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Application } from '../interfaces/application';
import config from '../config.json';
import { Interview } from '../interfaces/interviews';
import { Contact } from '../interfaces/contact';

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
        getContacts: build.query<Contact[], void>({
            query: () => 'contacts',
            providesTags: ['Contacts'],
        }),
        addNewContact: build.mutation<Contact, Partial<Contact>>({
            query: (initialContact) => ({
                url: '/contacts',
                method: 'POST',
                body: initialContact,
            }),
            invalidatesTags: ['Contacts'],
        }),
        editContact: build.mutation<Contact, Partial<Contact>>({
            query: (contact) => ({
                url: `/contacts/${contact.id}`,
                method: 'PUT',
                body: contact,
            }),
            invalidatesTags: ['Contacts'],
        }),
        deleteContact: build.mutation<void, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts'],
        }),
        getInterviews: build.query<Interview[], void>({
            query: () => 'interviews',
            providesTags: ['Interviews'],
        }),
        addNewInterview: build.mutation<Interview, Partial<Interview>>({
            query: (initialInterview) => ({
                url: '/interviews',
                method: 'POST',
                body: initialInterview,
            }),
            invalidatesTags: ['Interviews'],
        }),
        editInterview: build.mutation<Interview, Partial<Interview>>({
            query: (interview) => ({
                url: `/interviews/${interview.id}`,
                method: 'PUT',
                body: interview,
            }),
            invalidatesTags: ['Interviews'],
        }),
        deleteInterview: build.mutation<void, string>({
            query: (id) => ({
                url: `/interviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Interviews'],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useAddNewApplicationMutation,
    useEditApplicationMutation,
    useDeleteApplicationMutation,
    useGetContactsQuery,
    useAddNewContactMutation,
    useEditContactMutation,
    useDeleteContactMutation,
    useGetInterviewsQuery,
    useAddNewInterviewMutation,
    useEditInterviewMutation,
    useDeleteInterviewMutation,
} = api;
