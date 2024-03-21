import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import authReducer from '@redux/auth/authSlice';
import loaderReducer from '@redux/loader/loaderSlice';
import siderReducer from '@redux/sider/siderSlice';
import userReducer from '@redux/user/user-slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createBrowserHistory } from 'history';

import { apiSlice } from './api/apiSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        [apiSlice.reducerPath]: apiSlice.reducer,
        router: routerReducer,
        auth: authReducer,
        loader: loaderReducer,
        sider: siderReducer,
        user: userReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, routerMiddleware),
});

export const history = createReduxHistory(store);

// refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
