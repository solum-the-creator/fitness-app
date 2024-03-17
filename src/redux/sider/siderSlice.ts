import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit/react';

type SiderState = {
    isCollapsed: boolean;
};

const initialState: SiderState = {
    isCollapsed: false,
};

const siderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        setIsCollapsed: (state, { payload: isCollapsed }: PayloadAction<boolean>) => {
            state.isCollapsed = isCollapsed;
        },
    },
});

export const { setIsCollapsed } = siderSlice.actions;

export const isCollapsedSelector = createSelector(
    (state) => state.sider,
    (sider) => sider.isCollapsed,
);

export default siderSlice.reducer;
