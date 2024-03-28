import { Exercise } from '@redux/api/types';
import { nanoid } from 'nanoid';

import { ExerciseNameItem } from './exercise-name-item';

import styles from './exercise-name-list.module.scss';

type ExerciseNameListProps = {
    items: Exercise[];
    onEdit: () => void;
};

export const ExerciseNameList = ({ items, onEdit }: ExerciseNameListProps) => (
    <div className={styles.exercise_list}>
        {items.map((item, index) => (
            <ExerciseNameItem key={nanoid()} index={index} name={item.name} onEdit={onEdit} />
        ))}
    </div>
);
