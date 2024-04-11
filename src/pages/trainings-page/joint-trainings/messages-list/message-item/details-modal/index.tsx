/* eslint-disable no-underscore-dangle */
import { useEffect, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { DATE_FORMAT, PERIOD_TO_STRING } from '@constants/constants';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { Button, Empty } from 'antd';
import moment from 'moment';

import styles from './details-modal.module.scss';

import emptyImage from '/empty-image-fit.svg';

type DetailsModalProps = {
    trainingList: TrainingList;
    training: TrainingResponse;
    onClose: () => void;
};

export const DetailsModal = ({ trainingList = [], training, onClose }: DetailsModalProps) => {
    const isEmpty = training.exercises.length === 0;
    const formattedDate = moment(training.date).format(DATE_FORMAT);
    const modalRef = useRef<HTMLDivElement>(null);

    const trainingTypeKey =
        trainingList.find((item) => item.name === training.name)?.key || 'default';

    const stringPeriod = training.parameters?.period
        ? PERIOD_TO_STRING[training.parameters.period]
        : '';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, onClose]);

    return (
        <div className={styles.modal} ref={modalRef} data-test-id='joint-training-review-card'>
            <div className={styles.modal_header}>
                <TrainingTypeBadge type={trainingTypeKey} text={training.name} />
                <Button
                    type='text'
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className={styles.cancel_button}
                />
            </div>
            <div className={styles.modal_content}>
                <div className={styles.meta_info}>
                    <div className={styles.period}>{stringPeriod}</div>
                    <div className={styles.date}>{formattedDate}</div>
                </div>
                {isEmpty ? (
                    <Empty
                        image={emptyImage}
                        description=''
                        imageStyle={{ height: 32, margin: '0' }}
                        className={styles.empty}
                    />
                ) : (
                    <div className={styles.exercise_list}>
                        {training.exercises.map((exercise) => (
                            <div key={exercise._id} className={styles.exercise_item}>
                                <span className={styles.exercise_name}>{exercise.name}</span>

                                <span className={styles.exercise_info}>
                                    {exercise.approaches} х ({exercise.replays} x {exercise.weight}{' '}
                                    кг)
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
