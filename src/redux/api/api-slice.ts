/* eslint-disable no-underscore-dangle */
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RcFile } from 'antd/lib/upload';

import {
    ChangePasswordRequest,
    CheckEmailResponse,
    ConfrimEmailRequest,
    ConfrimEmailResponse,
    Feedback,
    LoginRequest,
    LoginResponse,
    RegistrationRequest,
    Training,
    TrainingList,
    TrainingResponse,
    UpdateUserRequest,
    UploadImage,
    User,
} from './types';

export const BASE_API_URL = 'https://marathon-api.clevertec.ru/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = (getState() as RootState).auth;

            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }

            return headers;
        },
        credentials: 'include',
        mode: 'cors',
    }),
    tagTypes: ['Feedback', 'Training', 'User'],
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
            query: () => ({
                url: 'user/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: [{ type: 'User', id: 'LIST' }],
        }),
        updateUser: builder.mutation<User, UpdateUserRequest>({
            query: (data) => ({
                url: 'user',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
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
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
                          { type: 'Feedback', id: 'LIST' },
                      ]
                    : [{ type: 'Feedback', id: 'LIST' }],
        }),
        createFeedback: builder.mutation<void, { message?: string; rating: number }>({
            query: ({ message, rating }) => ({
                url: '/feedback',
                method: 'POST',
                body: { message, rating },
            }),
            invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
        }),
        getTraining: builder.query<TrainingResponse[], { name: string } | void>({
            query: (arg) => ({
                url: '/training',
                method: 'GET',
                params: arg ? { name: arg.name } : undefined,
            }),
            providesTags: [{ type: 'Training', id: 'LIST' }],
        }),
        addTraining: builder.mutation<TrainingResponse, Training>({
            query: (training) => ({
                url: '/training',
                method: 'POST',
                body: {
                    name: training.name,
                    date: training.date,
                    exercises: training.exercises,
                },
            }),
            invalidatesTags: [{ type: 'Training', id: 'LIST' }],
        }),
        updateTraining: builder.mutation<TrainingResponse, TrainingResponse>({
            query: (training) => ({
                url: `/training/${training._id}`,
                method: 'PUT',
                body: {
                    ...training,
                    exercises: training.exercises,
                },
            }),
            invalidatesTags: [{ type: 'Training', id: 'LIST' }],
        }),
        getTrainingList: builder.query<TrainingList, void>({
            query: () => ({
                url: '/catalogs/training-list',
                method: 'GET',
            }),
        }),
        uploadImage: builder.mutation<UploadImage, { image: RcFile }>({
            query: ({ image }) => {
                const formData = new FormData();

                formData.append('file', image);

                return {
                    url: 'upload-image',
                    method: 'POST',
                    body: formData,
                };
            },
            transformResponse: (response: UploadImage) => ({
                ...response,
                url: `https://training-api.clevertec.ru/${response.url}`,
            }),
        }),
    }),
});

export const {
    useGetHealthmonitorQuery,
    useLoginMutation,
    useGetMeQuery,
    useUpdateUserMutation,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useGetFeedbackQuery,
    useCreateFeedbackMutation,
    useGetTrainingQuery,
    useLazyGetTrainingQuery,
    useGetTrainingListQuery,
    useAddTrainingMutation,
    useUpdateTrainingMutation,
    useUploadImageMutation,
} = apiSlice;
