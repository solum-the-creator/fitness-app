import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 0;

const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setInviteCount: (_, { payload }: PayloadAction<number>) => payload,
        increaseInviteCount: (state) => state + 1,
        decreaseInviteCount: (state) => state - 1,
    },
});

export const { setInviteCount } = inviteSlice.actions;

export const inviteCountSelector = (state: number) => state;

export default inviteSlice.reducer;
