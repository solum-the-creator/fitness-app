import { Outlet, useLocation } from 'react-router-dom';
import PATHS from '@constants/paths';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { Logo } from './_components/logo';
import { Navbar } from './_components/navbar';

import styles from './styles/layout-auth.module.scss';

type PathType = '/auth' | '/auth/registration';

export const LayoutAuth = () => {
    const location = useLocation();
    const path = location.pathname as PathType;
    const layoutClass = path === PATHS.AUTH ? styles.layout_auth : styles.layout_registration;

    return (
        <Content className={`${layoutClass} ${styles.content}`}>
            <Layout className={styles.form_container}>
                <div className={styles.form_enter}>
                    <div className={styles.main_container}>
                        <Logo />
                        <div className={styles.navbar_container}>
                            <Navbar />
                            <Outlet />
                        </div>
                    </div>
                </div>
            </Layout>
        </Content>
    );
};
