import { AuthPage } from '@pages/auth-page';
import { LayoutAuth } from '@pages/auth-page/layout-auth';
import { RegistrationPage } from '@pages/auth-page/registration-page';
import { MainPage } from '@pages/main-page';
import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path='/auth' element={<LayoutAuth />}>
            <Route index element={<AuthPage />} />
            <Route path='registration' element={<RegistrationPage />} />
        </Route>
        <Route path='/main' element={<MainPage />} />
    </Routes>
);
