import { ArrowLeftOutlined } from '@ant-design/icons';
import { TRAINING_COLORS } from '@constants/constants';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { Button, Empty } from 'antd';

import styles from './training-modal.module.scss';

import emptyImage from '/empty-image-fit.svg';

type TrainingModalProps = {
    trainingList: TrainingList;
    training: TrainingResponse;
    onClose: () => void;
    onEdit: (training: TrainingResponse) => void;
};

export const TrainingModal = ({ trainingList, training, onClose, onEdit }: TrainingModalProps) => {
    const isEmpty = training.exercises.length === 0;

    const trainingTypeKey =
        trainingList.find((item) => item.name === training.name)?.key || 'default';
    const trainingColor = TRAINING_COLORS[trainingTypeKey];

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className={styles.modal}
            onClick={handleModalClick}
            onKeyDown={handleKeyDown}
            role='button'
            tabIndex={0}
        >
            <Button
                icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
                type='text'
                className={styles.cancel_button}
                onClick={onClose}
                size='small'
            />

            <div
                className={styles.modal_header}
                style={{
                    borderColor: trainingColor,
                }}
            >
                <div className={styles.name}>{training.name}</div>
            </div>
            <div className={styles.modal_content}>
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
                                {exercise.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.modal_footer}>
                <Button
                    block={true}
                    onClick={() => onEdit(training)}
                    disabled={training.isImplementation}
                >
                    Добавить упражнения
                </Button>
            </div>
        </div>
    );
};
