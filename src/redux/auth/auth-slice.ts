import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    accessToken: string | null;
};

const initialState: AuthState = {
    accessToken: localStorage.getItem('authToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { accessToken } }: PayloadAction<{ accessToken: string }>,
        ) => {
            state.accessToken = accessToken;
        },
        logout: () => {
            localStorage.removeItem('authToken');

            return { accessToken: null };
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
