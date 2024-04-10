import { TrainingPartner } from '@redux/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TrainingPartner[] = [];

const userJointListSlice = createSlice({
    name: 'user-joint-list',
    initialState,
    reducers: {
        setUserJointList: (_, { payload }: PayloadAction<TrainingPartner[]>) => payload,
        updateUserInJointList: (state, { payload }: PayloadAction<Partial<TrainingPartner>>) => {
            const index = state.findIndex((user) => user.id === payload.id);

            if (index !== -1) {
                state[index] = { ...state[index], ...payload };
            }

            return state;
        },
    },
});

export const { setUserJointList, updateUserInJointList } = userJointListSlice.actions;

export const inviteCountSelector = (state: number) => state;

export default userJointListSlice.reducer;
