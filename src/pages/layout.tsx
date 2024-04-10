import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/sidebar';
import { STATUS_CODE } from '@constants/constants';
import { useGetInviteQuery, useGetMeQuery } from '@redux/api/api-slice';
import { logout } from '@redux/auth/auth-slice';
import { useAppDispatch } from '@redux/configure-store';
import { setInviteCount } from '@redux/invite/invite-slice';
import { setUser } from '@redux/user/user-slice';
import { Layout } from 'antd';

import styles from './main-page/main-page.module.scss';

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
    const { data: invites = [], isSuccess: isSuccessInvite } = useGetInviteQuery();

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

    useEffect(() => {
        if (isSuccessInvite) {
            dispatch(setInviteCount(invites.length));
        }
    }, [isSuccessInvite, dispatch, invites.length]);

    return (
        <Layout hasSider={true} style={{ height: '100%' }} className={styles.image_container}>
            <Sidebar />
            <Outlet />
        </Layout>
    );
};
