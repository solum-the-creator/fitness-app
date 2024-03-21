import { User } from '@redux/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
    email: '',
    readyForJointTraining: false,
    sendNotification: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => ({ ...state, ...payload }),
        resetUser: () => initialState,
    },
});

export const { setUser, resetUser } = userSlice.actions;

export const userSelector = (state: { user: User }) => state.user;

export default userSlice.reducer;
