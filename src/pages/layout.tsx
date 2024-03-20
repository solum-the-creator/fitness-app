import styles from './main-page/main-page.module.scss';
import { Sidebar } from '@components/sidebar';
import { STATUS_CODE } from '@constants/constants';
import { useGetMeQuery } from '@redux/api/apiSlice';
import { logout } from '@redux/auth/authSlice';
import { useAppDispatch } from '@redux/configure-store';
import { setUser } from '@redux/user/user-slice';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

type ErrorGetUser = {
    status: number;
    data: {
        message: string;
        statusCode: number;
        error: string;
    };
};

export const LayoutMain = () => {
    const dispatch = useAppDispatch();
    const { data: user, isError, error, isSuccess } = useGetMeQuery();

    useEffect(() => {
        if (isError) {
            const errorGetUser = error as ErrorGetUser;
            if (errorGetUser.status === STATUS_CODE.FORBIDDEN) {
                dispatch(logout());
            }
        }
        if (isSuccess) {
            dispatch(setUser(user));
        }
    }, [isError, error, dispatch, isSuccess, user]);

    return (
        <Layout hasSider style={{ height: '100%' }} className={styles.image_container}>
            <Sidebar />
            <Outlet />
        </Layout>
    );
};
