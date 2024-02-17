import { Layout } from 'antd';
import styles from './layout-auth.module.scss';

import { Content } from 'antd/lib/layout/layout';
import { Outlet } from 'react-router-dom';
import { Logo } from './_components/logo';
import { Navbar } from './_components/navbar';

export const LayoutAuth = () => {
    return (
        <div className={styles.background}>
            <Content className={styles.content}>
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
        </div>
    );
};
