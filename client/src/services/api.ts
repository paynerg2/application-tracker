import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Application } from '../interfaces/application';
import config from '../config.json';
import { Interview } from '../interfaces/interviews';
import { Contact } from '../interfaces/contact';
import { User } from '../interfaces/user';
import { LoginForm, SignUpForm } from '../types';

export interface LoginResponse {
    user: User;
    token: string;
}

export const tags = ['Applications', 'User', 'Interviews', 'Contacts'];
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: tags,
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginForm>({
            query: (credentials) => ({
                url: 'users/authenticate',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: build.mutation<any, SignUpForm>({
            query: (data) => ({
                url: '/users/register',
                method: 'POST',
                body: data,
            }),
        }),
        verifyUser: build.mutation({
            query: (body: { token: string }) => {
                return {
                    url: '/users/verify-user-mail',
                    method: 'POST',
                    body,
                };
            },
        }),
        updateUser: build.mutation<User, any>({
            query: (data) => {
                const { _id: id, ...rest } = data;
                return {
                    url: `/users/${id}`,
                    method: 'PATCH',
                    body: rest,
                };
            },
            invalidatesTags: ['User'],
        }),
        updateUserSettings: build.mutation<any, Partial<User>>({
            query: (data) => {
                const { _id: id, ...rest } = data;
                return {
                    url: `/users/${id}/settings`,
                    method: 'PATCH',
                    body: rest,
                };
            },
            invalidatesTags: ['User'],
        }),
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
            query: ({ id, ...application }) => ({
                url: `/applications/${id}`,
                method: 'PATCH',
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
            query: ({ id, ...contact }) => ({
                url: `/contacts/${id}`,
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
            query: ({ id, ...interview }) => ({
                url: `/interviews/${id}`,
                method: 'PATCH',
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
    useLoginMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useUpdateUserSettingsMutation,
    useVerifyUserMutation,
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
