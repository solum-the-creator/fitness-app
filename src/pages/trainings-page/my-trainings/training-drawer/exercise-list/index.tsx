import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Exercise } from '@redux/api/types';
import { createEmptyExercise } from '@utils/exercise';
import { Button } from 'antd';

import { ExerciseItem } from './exercise-item';

import styles from './exercise-list.module.scss';

type ExerciseListProps = {
    exerciseList: Array<Partial<Exercise>>;
    updateExerciseList: (exerciseList: Array<Partial<Exercise>>) => void;
};

export const ExerciseList = ({ exerciseList, updateExerciseList }: ExerciseListProps) => {
    const [currentExerciseList, setCurrentExerciseList] = useState<Array<Partial<Exercise>>>(
        exerciseList.length > 0 ? exerciseList : [createEmptyExercise()],
    );

    useEffect(() => {
        updateExerciseList(currentExerciseList);

        return () => {
            updateExerciseList([]);
        };
    }, [currentExerciseList, updateExerciseList]);

    const addExercise = () => {
        setCurrentExerciseList([...currentExerciseList, createEmptyExercise()]);
    };

    const handleUpdateExercise = (exercise: Partial<Exercise>) => {
        const updatedExerciseList = exerciseList.map((item) => {
            if (item.tempId === exercise.tempId) {
                return {
                    ...item,
                    ...exercise,
                };
            }

            return item;
        });

        setCurrentExerciseList(updatedExerciseList);
    };

    return (
        <React.Fragment>
            <div className={styles.exercise_list}>
                {currentExerciseList.map((exercise, index) => (
                    <ExerciseItem
                        key={exercise.tempId}
                        item={exercise}
                        index={index}
                        onUpdate={handleUpdateExercise}
                    />
                ))}
            </div>
            <div className={styles.buttons}>
                <Button
                    block={true}
                    icon={<PlusOutlined />}
                    size='large'
                    className={styles.add_button}
                    style={{ textAlign: 'start' }}
                    onClick={addExercise}
                >
                    Добавить ещё упражнение
                </Button>
            </div>
        </React.Fragment>
    );
};
