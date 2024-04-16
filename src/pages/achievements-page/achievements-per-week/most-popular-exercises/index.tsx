import { sortByWeekDay } from '@utils/sorting';

import { ExerciseItem } from './exercise-item';

import styles from './most-popular-exercises.module.scss';

type MostPopularExercisesProps = {
    data: PopularExercise[];
};

type PopularExercise = {
    date: string;
    name?: string;
};

export const MostPopularExercises = ({ data }: MostPopularExercisesProps) => {
    const sortedData = sortByWeekDay([...data]);

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Самые частые упражнения
                <br />
                по дням недели
            </p>
            <div className={styles.exercise_list}>
                {sortedData.map((item) => (
                    <ExerciseItem key={item.date} date={item.date} name={item.name} />
                ))}
            </div>
        </div>
    );
};
