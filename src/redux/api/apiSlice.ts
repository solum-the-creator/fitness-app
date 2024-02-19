import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, User } from './interfaces';
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
    }),
    endpoints: (builder) => ({
        getHealthmonitor: builder.query<void, void>({
            query: () => ({
                url: '/healthmonitor',
                responseHandler: (response) => response.text(),
            }),
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getMe: builder.query<User, void>({
            query: () => 'user/me',
        }),
    }),
});

export const { useGetHealthmonitorQuery, useLoginMutation, useGetMeQuery } = apiSlice;
