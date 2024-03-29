import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '@components/auth-routes';
import { UnauthRoutes } from '@components/unauth-routes';
import PATHS from '@constants/paths';
import { AuthPage } from '@pages/auth-page';
import { ChangePasswordPage } from '@pages/auth-page/change-password';
import { ConfirmEmailPage } from '@pages/auth-page/confirm-email';
import { Layout } from '@pages/auth-page/layout';
import { LayoutAuth } from '@pages/auth-page/layout-auth';
import { RegistrationPage } from '@pages/auth-page/registration-page';
import { Error } from '@pages/auth-page/result-pages/error';
import { ErrorChangePassword } from '@pages/auth-page/result-pages/error-change-password';
import { ErrorCheckEmail } from '@pages/auth-page/result-pages/error-check-email';
import { ErrorCheckEmailNoExist } from '@pages/auth-page/result-pages/error-check-email-no-exist';
import { ErrorLogin } from '@pages/auth-page/result-pages/error-login';
import { ErrorUserExist } from '@pages/auth-page/result-pages/error-user-exist';
import { LayoutResult } from '@pages/auth-page/result-pages/layout-result';
import { Success } from '@pages/auth-page/result-pages/success';
import { SuccessChangePassword } from '@pages/auth-page/result-pages/success-change-password';
import { CalendarPage } from '@pages/calendar-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { LayoutMain } from '@pages/layout';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-founde-page';
import { ProfilePage } from '@pages/profile-page';
import { SettingsPage } from '@pages/settings-page';
import { TrainingsPage } from '@pages/trainings-page';

export const AppRoutes = () => (
    <Routes>
        <Route element={<AuthRoutes />}>
            <Route element={<LayoutMain />}>
                <Route path={PATHS.ROOT} element={<Navigate to={PATHS.MAIN} replace={true} />} />
                <Route path={PATHS.MAIN} element={<MainPage />} />
                <Route path={PATHS.FEEDBACKS} element={<FeedbacksPage />} />
                <Route path={PATHS.CALENDAR} element={<CalendarPage />} />
                <Route path={PATHS.PROFILE} element={<ProfilePage />} />
                <Route path={PATHS.SETTINGS} element={<SettingsPage />} />
                <Route path={PATHS.TRAININGS} element={<TrainingsPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Route>
        <Route element={<UnauthRoutes />}>
            <Route path={PATHS.ROOT} element={<Navigate to={PATHS.AUTH} replace={true} />} />
            <Route element={<Layout />}>
                <Route path={PATHS.AUTH} element={<LayoutAuth />}>
                    <Route index={true} element={<AuthPage />} />
                    <Route path='registration' element={<RegistrationPage />} />
                </Route>

                <Route path={PATHS.AUTH} element={<LayoutResult />}>
                    <Route path='confirm-email' element={<ConfirmEmailPage />} />
                    <Route path='change-password' element={<ChangePasswordPage />} />
                </Route>
                <Route path='/result' element={<LayoutResult />}>
                    <Route path='error-login' element={<ErrorLogin />} />
                    <Route path='success' element={<Success />} />
                    <Route path='success-change-password' element={<SuccessChangePassword />} />
                    <Route path='error-user-exist' element={<ErrorUserExist />} />
                    <Route path='error' element={<Error />} />
                    <Route path='error-check-email-no-exist' element={<ErrorCheckEmailNoExist />} />
                    <Route path='error-check-email' element={<ErrorCheckEmail />} />
                    <Route path='error-change-password' element={<ErrorChangePassword />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to={PATHS.AUTH} replace={true} />} />
        </Route>
    </Routes>
);
