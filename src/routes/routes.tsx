import { AuthPage } from '@pages/auth-page';
import { LayoutAuth } from '@pages/auth-page/layout-auth';
import { RegistrationPage } from '@pages/auth-page/registration-page';
import { ErrorLogin } from '@pages/auth-page/result-pages/error-login';
import { ErrorUserExist } from '@pages/auth-page/result-pages/error-user-exist';
import { Error } from '@pages/auth-page/result-pages/error';
import { LayoutResult } from '@pages/auth-page/result-pages/layout-result';
import { Success } from '@pages/auth-page/result-pages/success';
import { MainPage } from '@pages/main-page';
import { ErrorCheckEmailNoExist } from '@pages/auth-page/result-pages/error-check-email-no-exist';
import { ErrorCheckEmail } from '@pages/auth-page/result-pages/error-check-email';

import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path='/auth' element={<LayoutAuth />}>
            <Route index element={<AuthPage />} />
            <Route path='registration' element={<RegistrationPage />} />
        </Route>
        <Route path='/result' element={<LayoutResult />}>
            <Route path='error-login' element={<ErrorLogin />} />
            <Route path='success' element={<Success />} />
            <Route path='error-user-exist' element={<ErrorUserExist />} />
            <Route path='error' element={<Error />} />
            <Route path='error-check-email-no-exist' element={<ErrorCheckEmailNoExist />} />
            <Route path='error-check-email' element={<ErrorCheckEmail />} />
        </Route>
        <Route path='/main' element={<MainPage />} />
    </Routes>
);
