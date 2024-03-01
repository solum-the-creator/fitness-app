import styles from './feedback.module.scss';

import { PlainHeader } from '@components/header/plain-header';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { useGetFeedbackQuery } from '@redux/api/apiSlice';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useMemo, useState } from 'react';
import { EmptyFeedbacks } from './empty-feedbacks';
import { Feedbacks } from './feedbacks';

export const FeedbacksPage = () => {
    // TODO: попробовать suspense или lazy loading
    // TODO: add links in breadcrumbs

    const { data: feedbacks = [], isFetching } = useGetFeedbackQuery();
    useLoaderLoading(isFetching);

    const isEmpty = feedbacks.length === 0;
    const [showAll, setShowAll] = useState(false);

    const sortedFeedbacks = useMemo(() => {
        return [...feedbacks];
        // TODO: add sorting by date
        // return [...feedbacks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }, [feedbacks]);

    console.log(feedbacks);

    const limitedFeedbacks = useMemo(() => {
        if (!showAll) {
            return sortedFeedbacks.slice(sortedFeedbacks.length - 4);
        }
        return sortedFeedbacks;
    }, [showAll, sortedFeedbacks]);

    const onShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <Layout className={styles.main_container}>
            <PlainHeader breadCrumbs={['Главная', 'Отзывы пользователей']} />
            <Content className={styles.content}>
                {isEmpty ? (
                    <EmptyFeedbacks />
                ) : (
                    <Feedbacks
                        showAll={showAll}
                        onShowAll={onShowAll}
                        feedbacks={limitedFeedbacks}
                    />
                )}
            </Content>
        </Layout>
    );
};
