import { apiSlice } from '@redux/api/api-slice';
import { logout } from '@redux/auth/auth-slice';
import { useAppDispatch } from '@redux/configure-store';
import { resetUser } from '@redux/user/user-slice';

export const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(resetUser());
        dispatch(apiSlice.util.resetApiState());
        dispatch(logout());
    };
};
