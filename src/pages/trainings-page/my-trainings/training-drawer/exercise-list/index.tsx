import { useState } from 'react';
import { Exercise } from '@redux/api/types';
import { nanoid } from 'nanoid';

import { ExerciseItem } from './exercise-item';

import styles from './exercise-list.module.scss';

type ExerciseListProps = {};

const emptyExercise: Partial<Exercise> = {
    name: '',
    replays: undefined,
    approaches: undefined,
    weight: undefined,
    isImplementation: false,
    tempId: nanoid(),
};

export const ExerciseList = ({}: ExerciseListProps) => {
    const [exerciseList, setExerciseList] = useState<Array<Partial<Exercise>>>([emptyExercise]);

    return (
        <div className={styles.exercise_list}>
            {exerciseList.map((exercise) => (
                <ExerciseItem key={exercise.tempId} item={exercise} />
            ))}
        </div>
    );
};
