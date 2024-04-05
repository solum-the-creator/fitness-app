import React, { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Exercise } from '@redux/api/types';
import { createEmptyExercise } from '@utils/exercise';
import { Button } from 'antd';
import { nanoid } from 'nanoid';

import { ExerciseItem } from './exercise-item';

import styles from './exercise-list.module.scss';

type ExerciseListProps = {
    exerciseList: Array<Partial<Exercise>>;
    isEditable: boolean;
    updateExerciseList: (exerciseList: Array<Partial<Exercise>>) => void;
};

export const ExerciseList = ({
    exerciseList,
    isEditable,
    updateExerciseList,
}: ExerciseListProps) => {
    const initialExerciseList =
        isEditable && exerciseList.length > 0
            ? [...exerciseList.map((item) => ({ ...item, tempId: nanoid() }))]
            : [createEmptyExercise()];

    const [currentExerciseList, setCurrentExerciseList] =
        useState<Array<Partial<Exercise>>>(initialExerciseList);

    const [checkedExerciseList, setCheckedExerciseList] = useState<string[]>([]);

    const handleCheckChange = (id: string) => {
        if (checkedExerciseList.includes(id)) {
            setCheckedExerciseList(checkedExerciseList.filter((item) => item !== id));
        } else {
            setCheckedExerciseList([...checkedExerciseList, id]);
        }
    };

    const onDeleteExercise = () => {
        const updatedExerciseList = exerciseList.filter(
            (item) => !checkedExerciseList.includes(item.tempId as string),
        );

        setCurrentExerciseList(updatedExerciseList);
        setCheckedExerciseList([]);
    };

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
                        isEditable={isEditable}
                        onCheckChange={handleCheckChange}
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
                    Добавить ещё
                </Button>
                {isEditable && (
                    <Button
                        block={true}
                        icon={<MinusOutlined />}
                        size='large'
                        type='text'
                        disabled={checkedExerciseList.length === 0}
                        className={styles.delete_button}
                        onClick={onDeleteExercise}
                    >
                        Удалить
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
};
