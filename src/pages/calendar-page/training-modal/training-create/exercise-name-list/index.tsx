import styles from './exercise-name-list.module.scss';

import { Exercise } from '@redux/api/types';
import { ExerciseNameItem } from './exercise-name-item';

type ExerciseNameListProps = {
    items: Exercise[];
    onEdit: () => void;
};

export const ExerciseNameList = ({ items, onEdit }: ExerciseNameListProps) => {
    return (
        <div className={styles.exercise_list}>
            {items.map((item, index) => (
                <ExerciseNameItem key={index} index={index} name={item.name} onEdit={onEdit} />
            ))}
        </div>
    );
};
