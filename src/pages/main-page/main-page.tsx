import 'antd/dist/antd.css';
import React from 'react';

import { Layout } from 'antd';
import { Sidebar } from '@components/sidebar';
import { Header } from '@components/header';

import styles from './main-page.module.scss';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <Layout hasSider style={{ height: '100%' }} className={styles.image_container}>
            <Sidebar />

            <Layout className={styles.main_container}>
                <Header />
                <Content>Main content</Content>
            </Layout>
        </Layout>
    );
};
