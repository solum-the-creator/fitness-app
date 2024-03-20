import { apiSlice } from '@redux/api/apiSlice';
import { logout } from '@redux/auth/authSlice';
import { useAppDispatch } from '@redux/configure-store';

export const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(apiSlice.util.resetApiState());
        dispatch(logout());
    };
};
