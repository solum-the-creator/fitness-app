import { useEffect, useMemo, useState } from 'react';
import { goBack, replace } from 'redux-first-history';
import { PlainHeader } from '@components/header/plain-header';
import { ErrorModal } from '@components/modals/error-modal';
import { STATUS_CODE } from '@constants/constants';
import PATHS from '@constants/paths';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useLogout } from '@hooks/use-logout';
import { useGetFeedbackQuery } from '@redux/api/apiSlice';
import { useAppDispatch } from '@redux/configure-store';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { EmptyFeedbacks } from './empty-feedbacks';
import { FeedbackModal } from './feedback-modal';
import { Feedbacks } from './feedbacks';

import styles from './feedback.module.scss';

type ErrorGetFeedbacks = {
    status: number;
    data: {
        message: string;
        statusCode: number;
        error: string;
    };
};

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();

    const { data: feedbacks = [], isFetching, isError, isLoading, error } = useGetFeedbackQuery();
    const logout = useLogout();

    useLoaderLoading(isFetching);

    const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState(false);
    const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const canShow = !isError && !isLoading;
    const isEmpty = feedbacks.length === 0;

    const sortedFeedbacks = useMemo(
        () => [...feedbacks].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
        [feedbacks],
    );

    const limitedFeedbacks = useMemo(() => {
        if (!showAll && sortedFeedbacks.length > 4) {
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

            if (errorGetFeedbacks.status === STATUS_CODE.FORBIDDEN) {
                logout();
                dispatch(replace('/auth'));
            } else {
                setIsOpenErrorModal(true);
            }
        }
    }, [isError, error, dispatch, logout]);

    return (
        <Layout className={styles.main_container}>
            <PlainHeader
                breadCrumbs={[
                    { title: 'Главная', link: PATHS.MAIN },
                    { title: 'Отзывы пользователей', link: PATHS.FEEDBACKS },
                ]}
            />
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
                    onShow={showFeedbackModal}
                    onClose={() => setIsOpenFeedbackModal(false)}
                    isModalOpen={isOpenFeedbackModal}
                />
            </Content>
        </Layout>
    );
};
