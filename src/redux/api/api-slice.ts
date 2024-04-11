/* eslint-disable no-underscore-dangle */
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    AddInviteRequest,
    AddTariffRequest,
    ChangePasswordRequest,
    CheckEmailResponse,
    ConfrimEmailRequest,
    ConfrimEmailResponse,
    Feedback,
    Invite,
    LoginRequest,
    LoginResponse,
    RegistrationRequest,
    TariffList,
    Training,
    TrainingList,
    TrainingPartner,
    TrainingResponse,
    UpdateInviteRequest,
    UpdateUserRequest,
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
    tagTypes: ['Feedback', 'Training', 'User', 'UserJointTrainingList', 'Invite', 'TrainingPals'],
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
                    isImplementation: training.isImplementation,
                    parameters: training.parameters,
                },
            }),
            invalidatesTags: [{ type: 'Training', id: 'LIST' }],
        }),
        updateTraining: builder.mutation<TrainingResponse, { id: string; training: Training }>({
            query: ({ id, training }) => ({
                url: `/training/${id}`,
                method: 'PUT',
                body: {
                    ...training,
                    exercises: training.exercises,
                    parameters: training.parameters,
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
        getTariffList: builder.query<TariffList, void>({
            query: () => ({
                url: '/catalogs/tariff-list',
                method: 'GET',
            }),
        }),
        addTariff: builder.mutation<void, AddTariffRequest>({
            query: (tariff) => ({
                url: '/tariff',
                method: 'POST',
                body: tariff,
            }),
        }),
        getTrainingPals: builder.query<TrainingPartner[], void>({
            query: () => ({
                url: '/catalogs/training-pals',
                method: 'GET',
            }),
            providesTags: [{ type: 'TrainingPals', id: 'LIST' }],
        }),
        getUserJointTrainingList: builder.query<TrainingPartner[], { trainingType: string } | void>(
            {
                query: (arg) => ({
                    url: '/catalogs/user-joint-training-list',
                    method: 'GET',
                    params: arg ? { trainingType: arg.trainingType } : undefined,
                }),
                providesTags: [{ type: 'UserJointTrainingList', id: 'LIST' }],
            },
        ),
        getInvite: builder.query<Invite[], void>({
            query: () => ({
                url: '/invite',
                method: 'GET',
            }),
            providesTags: [{ type: 'Invite', id: 'LIST' }],
        }),
        addInvite: builder.mutation<Invite, AddInviteRequest>({
            query: (invite) => ({
                url: '/invite',
                method: 'POST',
                body: invite,
            }),
            invalidatesTags: [{ type: 'UserJointTrainingList', id: 'LIST' }],
        }),
        updateInvite: builder.mutation<Invite, UpdateInviteRequest>({
            query: ({ id, status }) => ({
                url: '/invite',
                method: 'PUT',
                body: { id, status },
            }),
            invalidatesTags: [
                { type: 'Invite', id: 'LIST' },
                { type: 'UserJointTrainingList', id: 'LIST' },
                { type: 'TrainingPals', id: 'LIST' },
            ],
        }),
        deleteInvite: builder.mutation<void, string>({
            query: (id) => ({
                url: `/invite/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                { type: 'UserJointTrainingList', id: 'LIST' },
                { type: 'TrainingPals', id: 'LIST' },
            ],
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
    useGetTariffListQuery,
    useAddTariffMutation,
    useGetTrainingPalsQuery,
    useGetUserJointTrainingListQuery,
    useLazyGetUserJointTrainingListQuery,
    useGetInviteQuery,
    useAddInviteMutation,
    useUpdateInviteMutation,
    useDeleteInviteMutation,
} = apiSlice;
