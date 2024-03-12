import styles from './calendar-page.module.scss';

import { BaseHeader } from '@components/header/base-header';
import PATHS from '@constants/paths';

import { Content } from 'antd/lib/layout/layout';
import { useMediaQuery } from 'react-responsive';

import { Calendar, Modal } from 'antd';

import { RU_CALENDAR_LOCALE } from '@constants/constants';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/api/apiSlice';

import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useCallback, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Moment } from 'moment';
import { TrainingModal } from './training-modal';

export const CalendarPage = () => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });

    const { data: trainings, isFetching } = useGetTrainingQuery({});
    const {
        data: trainingList,
        isFetching: isFetchingTrainingList,
        isError,
        refetch,
    } = useGetTrainingListQuery();
    useLoaderLoading(isFetching || isFetchingTrainingList);

    // console.log(trainings);
    // console.log(trainingList);

    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined);
    const [isModalTrainingVisible, setIsModalTrainingVisible] = useState(false);

    const handleDateSelect = (value: Moment) => {
        setSelectedDate(value);
        setIsModalTrainingVisible(true);
    };

    const handleModalClose = () => {
        setSelectedDate(undefined);
        setIsModalTrainingVisible(false);
    };

    const dateCellRender = (value: Moment) => {
        const showModal = isModalTrainingVisible && value.isSame(selectedDate, 'day');

        return (
            <>
                {showModal && (
                    <TrainingModal
                        fullscreen={true}
                        weekDay={value.day()}
                        onClose={handleModalClose}
                    />
                )}
            </>
        );
    };

    const showErrorModal = useCallback(() => {
        return Modal.error({
            title: (
                <span data-test-id='modal-error-user-training-title'>
                    При открытии данных произошла ошибка
                </span>
            ),
            content: (
                <span data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</span>
            ),
            closable: true,
            centered: true,
            okText: <span data-test-id='modal-error-user-training-button'>Обновить</span>,
            closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
            width: '100%',
            maskStyle: { backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.1)' },
            className: styles.error_modal,
            wrapClassName: styles.error_modal_wrapper,
            onOk: () => refetch(),
        });
    }, [refetch]);

    useEffect(() => {
        let errorModal: ReturnType<typeof Modal.error> | null = null;
        if (isError) {
            errorModal = showErrorModal();
        }

        return () => {
            if (errorModal) {
                errorModal.destroy();
            }
        };
    }, [isError, showErrorModal]);

    return (
        <div className={styles.main_container}>
            <BaseHeader
                breadCrumbs={[
                    { title: 'Главная', link: PATHS.MAIN },
                    { title: 'Календарь', link: PATHS.CALENDAR },
                ]}
            />
            <Content className={styles.content}>
                <div className={styles.calendar_container}>
                    <Calendar
                        className={styles.calendar}
                        locale={RU_CALENDAR_LOCALE}
                        fullscreen={!matches}
                        value={selectedDate}
                        dateCellRender={dateCellRender}
                        onSelect={handleDateSelect}
                    />
                </div>
            </Content>
        </div>
    );
};
