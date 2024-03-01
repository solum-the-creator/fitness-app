import styles from './feedback.module.scss';

import { PlainHeader } from '@components/header/plain-header';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { useGetFeedbackQuery } from '@redux/api/apiSlice';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useEffect, useMemo, useState } from 'react';
import { EmptyFeedbacks } from './empty-feedbacks';
import { Feedbacks } from './feedbacks';
import { ErrorModal } from '@components/modals/error-modal';
import { useAppDispatch } from '@redux/configure-store';
import { goBack, replace } from 'redux-first-history';
import { logout } from '@redux/auth/authSlice';

type ErrorGetFeedbacks = {
    status: number;
    data: {
        message: string;
        statusCode: number;
        error: string;
    };
};

export const FeedbacksPage = () => {
    // TODO: add skeletons
    const dispatch = useAppDispatch();

    const { data: feedbacks = [], isFetching, isError, isLoading, error } = useGetFeedbackQuery();
    useLoaderLoading(isFetching);

    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const canShow = !isError && !isLoading;
    const isEmpty = feedbacks.length === 0;

    // TODO: add sorting
    const sortedFeedbacks = useMemo(() => [...feedbacks], [feedbacks]);

    const limitedFeedbacks = useMemo(() => {
        if (!showAll) {
            return sortedFeedbacks.slice(sortedFeedbacks.length - 4);
        }
        return sortedFeedbacks;
    }, [showAll, sortedFeedbacks]);

    const onShowAll = () => {
        setShowAll(!showAll);
    };

    const onBack = () => {
        dispatch(goBack());
    };

    useEffect(() => {
        if (isError) {
            const errorGetFeedbacks = error as ErrorGetFeedbacks;
            if (errorGetFeedbacks.status === 403) {
                dispatch(logout());
                dispatch(replace('/auth'));
            } else {
                setIsOpenErrorModal(true);
            }
        }
    }, [isError, error, dispatch]);

    return (
        <Layout className={styles.main_container}>
            <PlainHeader breadCrumbs={['Главная', 'Отзывы пользователей']} />
            <Content className={styles.content}>
                {canShow &&
                    (isEmpty ? (
                        <EmptyFeedbacks />
                    ) : (
                        <Feedbacks
                            showAll={showAll}
                            onShowAll={onShowAll}
                            feedbacks={limitedFeedbacks}
                        />
                    ))}
                <ErrorModal isModalOpen={isOpenErrorModal} onClose={onBack} />
            </Content>
        </Layout>
    );
};
