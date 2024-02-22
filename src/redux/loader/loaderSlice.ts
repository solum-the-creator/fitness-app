import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';

type LoaderState = {
    isLoading: boolean;
};

const initialState: LoaderState = {
    isLoading: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
            state.isLoading = isLoading;
        },
    },
});

export const { setIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
