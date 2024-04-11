/* eslint-disable no-underscore-dangle */
import React from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { DATE_FORMAT } from '@constants/constants';
import { primaryTextColor } from '@constants/styles';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { isPastDate } from '@utils/date-utils';
import { Button, Empty } from 'antd';
import { Moment } from 'moment';

import styles from './training-display.module.scss';

import emptyImage from '/empty-image-fit.svg';

type TrainingDisplayProps = {
    selectedDate: Moment;
    trainings: TrainingResponse[];
    trainingList: TrainingList;
    onCreate: () => void;
    onEdit: (training: TrainingResponse) => void;
    onClose: () => void;
};

export const TrainingDisplay = ({
    selectedDate,
    trainings,
    trainingList,
    onClose,
    onCreate,
    onEdit,
}: TrainingDisplayProps) => {
    const isEmpty = trainings.length === 0;
    const isPast = isPastDate(selectedDate);
    const isFull = trainings.length === trainingList.length;

    const isDisabled = isPast || isFull;

    const handleModalClose = () => {
        onClose();
    };

    const handleCreate = () => {
        onCreate();
    };

    return (
        <React.Fragment>
            <div className={styles.modal_header}>
                <div className={styles.header_content}>
                    <h4 className={styles.modal_title}>
                        Тренировки на {selectedDate.format(DATE_FORMAT)}
                    </h4>
                    {isEmpty && <p className={styles.modal_subtitle}>Нет активных тренировок</p>}
                </div>
                <Button
                    type='text'
                    icon={<CloseOutlined style={{ fontSize: '12px', color: primaryTextColor }} />}
                    onClick={handleModalClose}
                    className={styles.button_close}
                    data-test-id='modal-create-training-button-close'
                />
            </div>
            <div className={styles.modal_main}>
                {isEmpty ? (
                    <Empty
                        image={emptyImage}
                        description=''
                        imageStyle={{ height: 32, margin: '0' }}
                        className={styles.empty}
                    />
                ) : (
                    <div className={styles.trainings}>
                        {trainings.map((training, index) => (
                            <div key={training._id} className={styles.training_item}>
                                <div className={styles.training_name}>
                                    <TrainingTypeBadge
                                        type={
                                            trainingList.find((item) => item.name === training.name)
                                                ?.key || 'default'
                                        }
                                        text={training.name}
                                        disabled={training.isImplementation}
                                    />
                                </div>

                                <Button
                                    type='link'
                                    icon={<EditOutlined />}
                                    size='small'
                                    className={styles.button}
                                    onClick={() => onEdit(training)}
                                    disabled={training.isImplementation}
                                    data-test-id={`modal-update-training-edit-button${index}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.modal_footer}>
                <Button
                    type='primary'
                    size='large'
                    block={true}
                    onClick={handleCreate}
                    disabled={isDisabled}
                >
                    Создать тренировку
                </Button>
            </div>
        </React.Fragment>
    );
};
