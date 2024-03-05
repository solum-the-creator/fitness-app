import { Layout } from 'antd';
import styles from './styles/layout-auth.module.scss';

import { Content } from 'antd/lib/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import { Logo } from './_components/logo';
import { Navbar } from './_components/navbar';
import PATHS from '@constants/paths';

type PathType = '/auth' | '/auth/registration';

export const LayoutAuth = () => {
    const location = useLocation();
    const path = location.pathname as PathType;
    const layout_class = path === PATHS.AUTH ? styles.layout_auth : styles.layout_registration;

    return (
        <Content className={`${layout_class} ${styles.content}`}>
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
