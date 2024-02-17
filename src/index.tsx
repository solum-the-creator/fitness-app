import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from '@redux/configure-store';

import './styles/normilize.css';
import './styles/reset.css';

import './index.css';
import { routes } from './routes/routes';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
