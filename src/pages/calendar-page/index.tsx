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
import { TrainingTypeBadge } from '@components/training-type-badge';
import moment from 'moment';

export const CalendarPage = () => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });

    const { data: trainings, isFetching } = useGetTrainingQuery({});

    // TODO: replace traininglist to redux ???
    const {
        data: trainingList = [],
        isFetching: isFetchingTrainingList,
        isError,
        refetch,
    } = useGetTrainingListQuery();
    useLoaderLoading(isFetching || isFetchingTrainingList);

    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined);
    const [isModalTrainingVisible, setIsModalTrainingVisible] = useState(false);
    const [modalPostion, setModalPosition] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

    const handleDateSelect = (value: Moment) => {
        setSelectedDate(value);
        setIsModalTrainingVisible(true);
    };

    const handleModalClose = () => {
        setSelectedDate(undefined);
        setIsModalTrainingVisible(false);
    };

    useEffect(() => {
        if (matches) {
            if (selectedDate) {
                const cellId = `calendar_cell_${selectedDate.format('YYYY-MM-DD')}`;
                const cellElement = document.querySelector(`#${cellId}`);
                if (cellElement) {
                    const closestCellInner = cellElement.closest('.ant-picker-cell-inner');
                    if (closestCellInner) {
                        const { top, left, right, bottom } =
                            closestCellInner.getBoundingClientRect();
                        setModalPosition({ top, left, right, bottom });
                    }
                }
            }
        }
    }, [matches, selectedDate]);

    const dateCellRender = (value: Moment) => {
        const cellId = `calendar_cell_${value.format('YYYY-MM-DD')}`;
        const showModal = isModalTrainingVisible && value.isSame(selectedDate, 'day');

        const selectedTrainings =
            trainings?.filter((training) => {
                const trainingDate = moment(training.date);
                return value.isSame(trainingDate, 'day');
            }) || [];

        return (
            <>
                <div id={cellId} className={styles.calendar_cell}>
                    {selectedTrainings.map((training) => {
                        return matches ? (
                            <div key={training._id} className='mobile_cell'></div>
                        ) : (
                            <TrainingTypeBadge
                                key={training._id}
                                type={
                                    trainingList.find((item) => item.name === training.name)?.key ||
                                    'default'
                                }
                                text={training.name}
                                size='small'
                            />
                        );
                    })}
                </div>
                {showModal && (
                    <TrainingModal
                        trainingList={trainingList}
                        trainings={selectedTrainings}
                        fullscreen={!matches}
                        weekDay={value.day()}
                        onClose={handleModalClose}
                        position={modalPostion}
                        selectedDate={value}
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
            maskStyle: {
                backdropFilter: 'blur(6px)',
                background: 'rgba(121, 156, 212, 0.1)',
                zIndex: 2100,
            },
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
                        dateCellRender={trainingList.length > 0 ? dateCellRender : undefined}
                        onSelect={handleDateSelect}
                    />
                </div>
            </Content>
        </div>
    );
};
