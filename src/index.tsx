/* eslint-disable simple-import-sort/imports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from '@redux/configure-store';

import './styles/normilize.css';
import './styles/reset.css';
import 'antd/dist/antd.less';

import './index.css';

import 'moment/locale/ru';
import moment from 'moment';

import { Loader } from '@components/loader';
import { AppRoutes } from './routes/routes';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <AppRoutes />
            </HistoryRouter>
            <Loader />
        </Provider>
    </React.StrictMode>,
);
