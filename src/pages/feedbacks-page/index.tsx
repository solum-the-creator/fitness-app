import styles from './feedback.module.scss';

import { PlainHeader } from '@components/header/plain-header';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { useCreateFeedbackMutation, useGetFeedbackQuery } from '@redux/api/apiSlice';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useEffect, useMemo, useState } from 'react';
import { EmptyFeedbacks } from './empty-feedbacks';
import { Feedbacks } from './feedbacks';
import { ErrorModal } from '@components/modals/error-modal';
import { useAppDispatch } from '@redux/configure-store';
import { goBack, replace } from 'redux-first-history';
import { logout } from '@redux/auth/authSlice';
import { FeedbackModal } from './feedback-modal';

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
    // TODO: add refetching after creating feedback
    const dispatch = useAppDispatch();

    const {
        data: feedbacks = [],
        isFetching,
        refetch,
        isError,
        isLoading,
        error,
    } = useGetFeedbackQuery();
    const [createFeedback, { isLoading: isCreateLoading }] = useCreateFeedbackMutation();
    useLoaderLoading(isFetching || isCreateLoading);

    const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState(false);
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

    const showFeedbackModal = () => {
        setIsOpenFeedbackModal(true);
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

    const handleOnSend = async (values: { rating: number; message?: string }) => {
        try {
            await createFeedback(values).unwrap();
            refetch();
            setIsOpenFeedbackModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout className={styles.main_container}>
            <PlainHeader breadCrumbs={['Главная', 'Отзывы пользователей']} />
            <Content className={styles.content}>
                {canShow &&
                    (isEmpty ? (
                        <EmptyFeedbacks onShowFeedbackModal={showFeedbackModal} />
                    ) : (
                        <Feedbacks
                            showAll={showAll}
                            onShowAll={onShowAll}
                            onShowFeedbackModal={showFeedbackModal}
                            feedbacks={limitedFeedbacks}
                        />
                    ))}
                <ErrorModal isModalOpen={isOpenErrorModal} onClose={onBack} />
                <FeedbackModal
                    onSend={handleOnSend}
                    onClose={() => setIsOpenFeedbackModal(false)}
                    isModalOpen={isOpenFeedbackModal}
                />
            </Content>
        </Layout>
    );
};
