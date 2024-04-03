import { Exercise } from '@redux/api/types';
import { Input, InputNumber } from 'antd';

import styles from './exercise-item.module.scss';

type ExerciseItemProps = {
    item: Partial<Exercise>;
    index: number;
    onUpdate: (exercise: Partial<Exercise>) => void;
};

export const ExerciseItem = ({ item, index, onUpdate }: ExerciseItemProps) => {
    const handleUpdate = (updatedExercise: Partial<Exercise> = {}) => {
        onUpdate({ ...item, ...updatedExercise });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdate({ name: e.target.value });
    };

    const handleApproachesChange = (value: number | null) => {
        if (value !== null && value >= 1) {
            handleUpdate({ approaches: value });
        } else {
            handleUpdate({ approaches: 1 });
        }
    };

    const handleWeightChange = (value: number | null) => {
        if (value === null) {
            handleUpdate({ weight: 0 });
        } else {
            handleUpdate({ weight: value });
        }
    };

    const handleReplaysChange = (value: number | null) => {
        if (value === null || value < 1) {
            handleUpdate({ replays: 1 });
        } else {
            handleUpdate({ replays: value });
        }
    };

    return (
        <div className={styles.exercise}>
            <Input
                placeholder='Упражнение'
                size='small'
                type='text'
                value={item.name}
                onChange={handleNameChange}
                maxLength={32}
                data-test-id={`modal-drawer-right-input-exercise${index}`}
            />
            <div className={styles.columns}>
                <div className={styles.approach}>
                    <span className={styles.label}>Подходы</span>
                    <div className={styles.approach_input}>
                        <InputNumber
                            addonBefore='+'
                            min={1}
                            type='number'
                            placeholder='1'
                            size='small'
                            value={item.approaches}
                            onChange={handleApproachesChange}
                            data-test-id={`modal-drawer-right-input-approach${index}`}
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.weight}>
                        <span className={styles.label}>Вес,&nbsp;кг</span>
                        <div className={styles.weight_input}>
                            <InputNumber
                                type='number'
                                min={0}
                                placeholder='0'
                                size='small'
                                value={item.weight}
                                onChange={handleWeightChange}
                                data-test-id={`modal-drawer-right-input-weight${index}`}
                            />
                        </div>
                    </div>
                    <div className={styles.count}>
                        <span className={styles.label}>Количество</span>
                        <div className={styles.count_input}>
                            <InputNumber
                                type='number'
                                placeholder='3'
                                min={1}
                                size='small'
                                value={item.replays}
                                onChange={handleReplaysChange}
                                data-test-id={`modal-drawer-right-input-quantity${index}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
