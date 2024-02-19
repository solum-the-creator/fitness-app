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
import { SuccessChangePassword } from '@pages/auth-page/result-pages/success-change-password';
import { ErrorChangePassword } from '@pages/auth-page/result-pages/error-change-password';

import { Route, Routes } from 'react-router-dom';
import { TestPage } from '@pages/test';
import { Layout } from '@pages/auth-page/layout';
import { AuthRoutes } from '@components/auth-routes';
import { UnauthRoutes } from '@components/unauth-routes';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthRoutes />}>
                <Route path='/main' element={<MainPage />} />
            </Route>
            <Route element={<UnauthRoutes />}>
                <Route element={<Layout />}>
                    <Route path='/auth' element={<LayoutAuth />}>
                        <Route index element={<AuthPage />} />
                        <Route path='registration' element={<RegistrationPage />} />
                    </Route>

                    <Route path='/result' element={<LayoutResult />}>
                        <Route path='error-login' element={<ErrorLogin />} />
                        <Route path='success' element={<Success />} />
                        <Route path='success-change-password' element={<SuccessChangePassword />} />
                        <Route path='error-user-exist' element={<ErrorUserExist />} />
                        <Route path='error' element={<Error />} />
                        <Route
                            path='error-check-email-no-exist'
                            element={<ErrorCheckEmailNoExist />}
                        />
                        <Route path='error-check-email' element={<ErrorCheckEmail />} />
                        <Route path='error-change-password' element={<ErrorChangePassword />} />
                        <Route path='test' element={<TestPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};
