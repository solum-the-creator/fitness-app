import { TrainingPartner } from '@redux/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TrainingPartner[] = [];

const TrainingPartnersSlice = createSlice({
    name: 'training-partners',
    initialState,
    reducers: {
        setTrainingPartners: (_, { payload }: PayloadAction<TrainingPartner[]>) => payload,
        updateTrainingPartners: (state, { payload }: PayloadAction<Partial<TrainingPartner>>) => {
            const index = state.findIndex((user) => user.id === payload.id);

            if (index !== -1) {
                state[index] = { ...state[index], ...payload };
            }

            return state;
        },
        deleteTrainingPartner: (state, { payload }: PayloadAction<string>) =>
            state.filter((user) => user.inviteId !== payload),
    },
});

export const { setTrainingPartners, updateTrainingPartners, deleteTrainingPartner } =
    TrainingPartnersSlice.actions;

export default TrainingPartnersSlice.reducer;
