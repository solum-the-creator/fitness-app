import { useAppSelector } from '@redux/configure-store';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoutes = () => {
    const authToken = useAppSelector((state) => state.auth.accessToken);

    return authToken ? <Outlet /> : <Navigate to={'/auth'} />;
};
