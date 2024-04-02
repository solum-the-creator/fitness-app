import { Exercise } from '@redux/api/types';
import { Input, InputNumber } from 'antd';

import styles from './exercise-item.module.scss';

type ExerciseItemProps = {
    item: Partial<Exercise>;
};

export const ExerciseItem = ({ item }: ExerciseItemProps) => {
    console.log(item);

    return (
        <div className={styles.exercise}>
            <Input
                placeholder='Упражнение'
                size='small'
                type='text'
                // value={name}
                // onChange={handleNameChange}
                maxLength={32}
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
                            // value={approaches}
                            // onChange={handleApproachesChange}
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
                                // value={weight}
                                // onChange={handleWeightChange}
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
                                // value={replays}
                                // onChange={handleReplaysChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
