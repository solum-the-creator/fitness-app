import 'antd/dist/antd.css';
import React from 'react';

import { Layout } from 'antd';
import { Sidebar } from '@components/sidebar';
import { Header } from '@components/header';

const { Content, Footer } = Layout;

export const MainPage: React.FC = () => {
    return (
        <Layout hasSider style={{ height: '100%' }}>
            <Sidebar />

            <Layout>
                <Header />
                <Layout>
                    <Content>Main content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};
