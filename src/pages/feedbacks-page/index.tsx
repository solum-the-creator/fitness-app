import { PlainHeader } from '@components/header/plain-header';
import { Layout } from 'antd';

export const FeedbacksPage = () => {
    return (
        <Layout>
            <PlainHeader breadCrumbs={['Главная', 'Отзывы пользователей']} />
        </Layout>
    );
};
