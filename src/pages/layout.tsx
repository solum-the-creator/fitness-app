import styles from './main-page/main-page.module.scss';
import { Sidebar } from '@components/sidebar';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const LayoutMain = () => {
    return (
        <Layout hasSider style={{ height: '100%' }} className={styles.image_container}>
            <Sidebar />
            <Outlet />
        </Layout>
    );
};
