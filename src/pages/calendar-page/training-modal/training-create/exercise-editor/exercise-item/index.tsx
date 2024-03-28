import { useState } from 'react';
import { Exercise, ExerciseResponse } from '@redux/api/types';
import { Checkbox, Input, InputNumber } from 'antd';

import styles from './exercise-item.module.scss';

type ExerciseItemProps = {
    item: Partial<Exercise> | ExerciseResponse;
    index: number;
    isEditable: boolean;
    onUpdate: (exercise: Partial<Exercise>) => void;
    onCheckChange: (id: string) => void;
};

export const ExerciseItem = ({
    item,
    index,
    isEditable,
    onUpdate,
    onCheckChange,
}: ExerciseItemProps) => {
    const [name, setName] = useState(item.name);
    const [approaches, setApproaches] = useState(item.approaches);
    const [replays, setReplays] = useState(item.replays);
    const [weight, setWeight] = useState(item.weight);

    const handleUpdate = (updatedExercise: Partial<Exercise> = {}) => {
        onUpdate({ ...item, ...updatedExercise });
    };

    const handleCheckChange = () => {
        onCheckChange(item.tempId as string);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        handleUpdate({ name: e.target.value });
    };

    const handleApproachesChange = (value: number | null) => {
        if (value !== null && value >= 1) {
            setApproaches(value);
            handleUpdate({ approaches: value });
        } else {
            setApproaches(1);
            handleUpdate({ approaches: 1 });
        }
    };

    const handleWeightChange = (value: number | null) => {
        if (value === null) {
            setWeight(0);
            handleUpdate({ approaches: 0 });
        } else {
            setWeight(value);
            handleUpdate({ weight: value });
        }
    };

    const handleReplaysChange = (value: number | null) => {
        if (value !== null && value >= 1) {
            setReplays(value);
            handleUpdate({ replays: value });
        } else {
            setReplays(1);
            handleUpdate({ replays: 1 });
        }
    };

    return (
        <div className={styles.exercise}>
            <Input
                placeholder='Упражнение'
                size='small'
                type='text'
                value={name}
                onChange={handleNameChange}
                maxLength={32}
                addonAfter={
                    isEditable && (
                        <Checkbox
                            onChange={handleCheckChange}
                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                        />
                    )
                }
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
                            value={approaches}
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
                                value={weight}
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
                                value={replays}
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
