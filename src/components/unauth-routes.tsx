import PATHS from '@constants/paths';
import { useAppSelector } from '@redux/configure-store';
import { Navigate, Outlet } from 'react-router-dom';

export const UnauthRoutes = () => {
    const authToken = useAppSelector((state) => state.auth.accessToken);

    return !authToken ? <Outlet /> : <Navigate to={PATHS.MAIN} replace />;
};
