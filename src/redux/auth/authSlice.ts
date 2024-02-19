import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
    accessToken: string | null;
};

const initialState: AuthState = {
    accessToken: null,
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
    },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
