import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './training-create.module.scss';
import { Exercise, TrainingList } from '@redux/api/types';
import { Button, Empty, Select } from 'antd';
import emptyImage from '/empty-image-fit.svg';
import { useState } from 'react';
import { ExerciseEditor } from './exercise-editor';
import { ExerciseNameList } from './exercise-name-list';

type TrainingCreateProps = {
    onCancel: () => void;
    trainingList: TrainingList;
};

export const TrainingCreate = ({ onCancel, trainingList }: TrainingCreateProps) => {
    const [isExerciseOpen, setIsExerciseOpen] = useState(false);
    const [exerciseList, setExerciseList] = useState<Exercise[]>([
        { name: 'Скручивания', replays: 1, approaches: 1, weight: 0, isImplementation: false },
        { name: 'Отжимания', replays: 1, approaches: 1, weight: 0, isImplementation: false },
        { name: 'Отжимания', replays: 1, approaches: 1, weight: 0, isImplementation: false },
    ]);
    const isEmpty = exerciseList.length === 0;

    const options = trainingList.map((item) => ({ value: item.key, label: item.name }));

    return (
        <>
            <div className={styles.modal_header}>
                <div className={styles.cancel}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        type='text'
                        className={styles.button}
                        onClick={onCancel}
                        data-test-id='modal-exercise-training-button-close'
                    />
                </div>
                <div className={styles.select}>
                    <Select
                        style={{ width: '100%' }}
                        size='small'
                        placeholder='Выбор типа тренировки'
                        popupClassName={styles.select_popup}
                        options={options}
                        data-test-id='modal-create-exercise-select'
                    />
                </div>
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
                    <ExerciseNameList items={exerciseList} />
                )}
            </div>
            <div className={styles.modal_footer}>
                <Button block onClick={() => setIsExerciseOpen(true)}>
                    Добавить упражнения
                </Button>
                <Button type='link' block>
                    Сохранить
                </Button>
            </div>
            <ExerciseEditor isOpen={isExerciseOpen} onClose={() => setIsExerciseOpen(false)} />
        </>
    );
};
