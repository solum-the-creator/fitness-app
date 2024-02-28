import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';

type SiderState = {
    isCollapsed: boolean;
};

const initialState: SiderState = {
    isCollapsed: false,
};

const loaderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        setIsCollapsed: (state, { payload: isCollapsed }: PayloadAction<boolean>) => {
            state.isCollapsed = isCollapsed;
        },
    },
});

export const { setIsCollapsed } = loaderSlice.actions;

export default loaderSlice.reducer;
