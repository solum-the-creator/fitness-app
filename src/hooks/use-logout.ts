import { apiSlice } from '@redux/api/api-slice';
import { logout } from '@redux/auth/auth-slice';
import { useAppDispatch } from '@redux/configure-store';

export const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(apiSlice.util.resetApiState());
        dispatch(logout());
    };
};
