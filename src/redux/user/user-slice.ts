import { User } from '@redux/api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    email: '',
    readyForJointTraining: false,
    sendNotification: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => {
            return { ...state, ...payload };
        },
        resetUser: () => {
            return initialState;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export const userSelector = (state: { user: User }) => state.user;

export default userSlice.reducer;
