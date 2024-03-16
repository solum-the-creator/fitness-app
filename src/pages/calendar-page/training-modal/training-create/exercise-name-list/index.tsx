import styles from './exercise-name-list.module.scss';

import { Exercise } from '@redux/api/types';
import { ExerciseNameItem } from './exercise-name-item';

type ExerciseNameListProps = {
    items: Exercise[];
};

export const ExerciseNameList = ({ items }: ExerciseNameListProps) => {
    return (
        <div className={styles.exercise_list}>
            {items.map((item, index) => (
                <ExerciseNameItem key={index} name={item.name} />
            ))}
        </div>
    );
};
