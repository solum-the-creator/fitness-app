import { Navigate, Outlet } from 'react-router-dom';
import PATHS from '@constants/paths';
import { useAppSelector } from '@redux/configure-store';

export const UnauthRoutes = () => {
    const authToken = useAppSelector((state) => state.auth.accessToken);

    return authToken ? <Navigate to={PATHS.MAIN} replace={true} /> : <Outlet />;
};
