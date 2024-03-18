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
import moment from 'moment';
import { CellItem } from './cell-item';

export const CalendarPage = () => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });

    const { data: trainings, isFetching } = useGetTrainingQuery({});

    const {
        data: trainingList = [],
        isFetching: isFetchingTrainingList,
        isError,
        refetch,
    } = useGetTrainingListQuery();
    useLoaderLoading(isFetching || isFetchingTrainingList);

    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState<Moment>(moment());
    const [currentMonth, setCurrentMonth] = useState<number>(moment().month());
    const [isModalTrainingVisible, setIsModalTrainingVisible] = useState(false);
    const [selectedCell, setSelectedCell] = useState<HTMLDivElement | null>(null);
    const [modalPostion, setModalPosition] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

    const handleDateSelect = (value: Moment) => {
        if (matches) {
            if (value.month() !== currentMonth) {
                setCurrentMonth(value.month());
                setSelectedCalendarDate(value);
                handleModalClose();
                return;
            }
        }

        setSelectedDate(value);
        setIsModalTrainingVisible(true);
    };

    const onChange = (value: Moment) => {
        setSelectedCalendarDate(value);
        handleModalClose();
    };

    const onCellClick = (e: React.MouseEvent<HTMLDivElement>, value: Moment) => {
        e.stopPropagation();
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }

        const currentCell = e.currentTarget.closest('.ant-picker-cell') as HTMLDivElement | null;
        setSelectedCell(currentCell);

        currentCell?.classList.add('selected');
        handleDateSelect(value);
    };

    const handleModalClose = () => {
        setSelectedDate(undefined);
        setIsModalTrainingVisible(false);
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (matches) {
            if (selectedDate) {
                if (selectedCell) {
                    timeoutId = setTimeout(() => {
                        const { top, left, right, bottom } = selectedCell.getBoundingClientRect();
                        setModalPosition({ top, left, right, bottom });
                    }, 100);
                }
            }
        }

        return () => clearTimeout(timeoutId);
    }, [matches, selectedDate, selectedCell]);

    const dateFullCellRender = (value: Moment) => {
        const cellId = `calendar_cell_${value.format('YYYY-MM-DD')}`;
        const showModal = isModalTrainingVisible && value.isSame(selectedDate, 'day');

        const todayClass = value.isSame(moment(), 'day') ? 'ant-picker-calendar-date-today' : '';

        const selectedTrainings =
            trainings?.filter((training) => {
                const trainingDate = moment(training.date);
                return value.isSame(trainingDate, 'day');
            }) || [];

        return (
            <div
                className={`ant-picker-cell-inner ant-picker-calendar-date ${todayClass}`}
                onClick={(e) => onCellClick(e, value)}
            >
                <div>
                    <div className='ant-picker-calendar-date-value'>{value.date()}</div>
                    <div className='ant-picker-calendar-date-content'>
                        <CellItem
                            key={cellId}
                            cellId={cellId}
                            selectedTrainings={selectedTrainings}
                            showModal={showModal}
                            date={value}
                            handleModalClose={handleModalClose}
                            modalPostion={modalPostion}
                            trainingList={trainingList}
                        />
                    </div>
                </div>
            </div>
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
                        value={selectedCalendarDate}
                        onChange={onChange}
                        dateFullCellRender={dateFullCellRender}
                    />
                </div>
            </Content>
        </div>
    );
};
