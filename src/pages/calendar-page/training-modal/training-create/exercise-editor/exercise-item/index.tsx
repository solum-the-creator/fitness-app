import { Input, InputNumber } from 'antd';
import styles from './exercise-item.module.scss';
import { Exercise } from '@redux/api/types';
import { useState } from 'react';

type ExerciseItemProps = {
    item: Partial<Exercise>;
    index: number;
    onUpdate: (exercise: Partial<Exercise>, index: number) => void;
};

export const ExerciseItem = ({ item, index, onUpdate }: ExerciseItemProps) => {
    const [name, setName] = useState(item.name);
    const [approaches, setApproaches] = useState(item.approaches);
    const [replays, setReplays] = useState(item.replays);
    const [weight, setWeight] = useState(item.weight);

    const handleUpdate = () => {
        onUpdate({ name, approaches, replays, weight }, index);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        handleUpdate();
    };

    const handleApproachesChange = (value: number | null) => {
        if (value !== null && value >= 1) {
            setApproaches(value);
        } else if (value === null) {
            setApproaches(1);
        }
        handleUpdate();
    };

    const handleWeightChange = (value: number | null) => {
        if (value !== null) {
            setWeight(value);
        } else {
            setWeight(0);
        }
        handleUpdate();
    };

    const handleReplaysChange = (value: number | null) => {
        if (value !== null && value >= 1) {
            setReplays(value);
        } else if (value === null) {
            setReplays(1);
        }
        handleUpdate();
    };

    return (
        <div className={styles.exercise}>
            <Input
                placeholder='Упражнение'
                size='small'
                value={name}
                onChange={handleNameChange}
                maxLength={32}
            />
            <div className={styles.columns}>
                <div className={styles.approach}>
                    <span className={styles.label}>Подходы</span>
                    <div className={styles.approach_input}>
                        <InputNumber
                            addonBefore={'+'}
                            min={1}
                            type='number'
                            placeholder='1'
                            size='small'
                            value={approaches}
                            onChange={handleApproachesChange}
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
