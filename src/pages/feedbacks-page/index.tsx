import { RootState } from '@redux/configure-store';
import styles from './feedback.module.scss';

import { PlainHeader } from '@components/header/plain-header';
import { Button, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useGetFeedbackQuery } from '@redux/api/apiSlice';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { FeedbackCard } from './feedback-card';
import { useEffect, useMemo, useRef, useState } from 'react';

export const FeedbacksPage = () => {
    // TODO: попробовать suspense или lazy loading
    // TODO: add links in breadcrumbs
    const matches = useMediaQuery({ query: `(max-width: 768px)` });
    const isSiderCollapsed = useSelector((state: RootState) => state.sider.isCollapsed);
    const extraPadding = isSiderCollapsed ? styles.extra_padding : styles.no_extra_padding;

    const { data: feedbacks = [], isFetching } = useGetFeedbackQuery();
    useLoaderLoading(isFetching);

    const containerRef = useRef<HTMLDivElement>(null);
    const isEmpty = feedbacks?.length === 0;

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

    useEffect(() => {
        if (showAll) {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }
    }, [limitedFeedbacks, showAll]);

    return (
        <Layout className={styles.main_container}>
            <PlainHeader breadCrumbs={['Главная', 'Отзывы пользователей']} />
            <Content className={styles.content}>
                {isEmpty ? (
                    <div className={styles.empty_container}>
                        <div className={`${styles.keep_feedback_container} ${extraPadding}`}>
                            <div className={styles.keep_feedback}>
                                <h3 className={styles.title}>Оставьте свой отзыв первым</h3>
                                <p className={styles.description}>
                                    Вы можете быть первым, кто оставит отзыв об этом фитнесс
                                    приложении.
                                    <br />
                                    Поделитесь своим мнением и опытом с другими пользователями,
                                    <br />и помогите им сделать правильный выбор.
                                </p>
                            </div>
                        </div>
                        <Button
                            type='primary'
                            size='large'
                            className={styles.button}
                            block={matches}
                        >
                            Написать отзыв
                        </Button>
                    </div>
                ) : (
                    <div className={styles.content_container}>
                        <div className={styles.feedbacks_container} ref={containerRef}>
                            {limitedFeedbacks.map((feedback) => (
                                <FeedbackCard {...feedback} key={feedback.id} />
                            ))}
                        </div>
                        <div className={styles.button_container}>
                            <Button type='primary' size='large' className={styles.feedback_button}>
                                Написать отзыв
                            </Button>
                            <Button
                                type='link'
                                size='large'
                                className={styles.show_button}
                                onClick={onShowAll}
                            >
                                {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                            </Button>
                        </div>
                    </div>
                )}
            </Content>
        </Layout>
    );
};
