import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    CheckEmailResponse,
    ConfrimEmailRequest,
    ConfrimEmailResponse,
    LoginRequest,
    LoginResponse,
    RegistrationRequest,
    User,
    ChangePasswordRequest,
    Feedback,
} from './interfaces';
import { RootState } from '@redux/configure-store';

const url = 'https://marathon-api.clevertec.ru/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.accessToken;
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
        credentials: 'include',
        mode: 'cors',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<void, RegistrationRequest>({
            query: (credentials) => ({
                url: 'auth/registration',
                method: 'POST',
                body: credentials,
            }),
        }),
        checkEmail: builder.mutation<CheckEmailResponse, string>({
            query: (email) => ({
                url: 'auth/check-email',
                method: 'POST',
                body: { email },
            }),
        }),
        confirmEmail: builder.mutation<ConfrimEmailResponse, ConfrimEmailRequest>({
            query: (credentials) => ({
                url: 'auth/confirm-email',
                method: 'POST',
                body: credentials,
            }),
        }),
        changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
            query: (credentials) => ({
                url: 'auth/change-password',
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
        }),
        getMe: builder.query<User, void>({
            query: () => 'user/me',
        }),
        getHealthmonitor: builder.query<void, void>({
            query: () => ({
                url: '/healthmonitor',
                responseHandler: (response) => response.text(),
            }),
        }),
        getFeedback: builder.query<Feedback[], void>({
            query: () => ({
                url: '/feedback',
            }),
        }),
    }),
});

export const {
    useGetHealthmonitorQuery,
    useLoginMutation,
    useGetMeQuery,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useGetFeedbackQuery,
    useLazyGetFeedbackQuery,
} = apiSlice;
