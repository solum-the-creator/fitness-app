import styles from './training-display.module.scss';

import emptyImage from '/empty-image-fit.svg';
import { Moment } from 'moment';
import { Button, Empty } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { isPastDate } from '@utils/date-utils';

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

    const handleModalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClose();
    };

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCreate();
    };

    return (
        <>
            <div className={styles.modal_header}>
                <div className={styles.header_content}>
                    <h4 className={styles.modal_title}>
                        Тренировки на {selectedDate.format('DD.MM.YYYY')}
                    </h4>
                    {isEmpty && <p className={styles.modal_subtitle}>Нет активных тренировок</p>}
                </div>
                <Button
                    type='text'
                    icon={<CloseOutlined style={{ fontSize: '12px', color: '#262626' }} />}
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
                                <div>
                                    <TrainingTypeBadge
                                        type={
                                            trainingList.find((item) => item.name === training.name)
                                                ?.key || 'default'
                                        }
                                        text={training.name}
                                    />
                                </div>

                                <Button
                                    type='link'
                                    icon={<EditOutlined />}
                                    size='small'
                                    className={styles.button}
                                    onClick={() => onEdit(training)}
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
                    block
                    onClick={handleCreate}
                    disabled={isDisabled}
                >
                    Создать тренировку
                </Button>
            </div>
        </>
    );
};
