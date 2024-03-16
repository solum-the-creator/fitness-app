import styles from './training-display.module.scss';

import emptyImage from '/empty-image-fit.svg';
import { Moment } from 'moment';
import { Button, Empty } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { TrainingTypeBadge } from '@components/training-type-badge';

type TrainingDisplayProps = {
    onClose: () => void;
    onCreate: () => void;
    selectedDate: Moment;
    trainings: TrainingResponse;
    trainingList: TrainingList;
};

export const TrainingDisplay = ({
    selectedDate,
    trainings,
    trainingList,
    onClose,
    onCreate,
}: TrainingDisplayProps) => {
    const isEmpty = trainings.length === 0;

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
                                <TrainingTypeBadge
                                    type={
                                        trainingList.find((item) => item.name === training.name)
                                            ?.key || 'default'
                                    }
                                    text={training.name}
                                />
                                <Button
                                    type='link'
                                    icon={<EditOutlined />}
                                    size='small'
                                    className={styles.button}
                                    data-test-id={`modal-update-training-edit-button${index}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.modal_footer}>
                <Button type='primary' size='large' block onClick={handleCreate}>
                    Создать тренировку
                </Button>
            </div>
        </>
    );
};
