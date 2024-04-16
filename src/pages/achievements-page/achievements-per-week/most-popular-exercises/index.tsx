import { PopularExercise } from '@utils/exercise';
import { sortByWeekDay } from '@utils/sorting';

import { ExerciseItem } from './exercise-item';

import styles from './most-popular-exercises.module.scss';

type MostPopularExercisesProps = {
    data: Array<{
        date: string;
        mostPopularExercise: PopularExercise | null;
    }>;
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
                    <ExerciseItem
                        key={item.date}
                        date={item.date}
                        name={item.mostPopularExercise && item.mostPopularExercise.name}
                    />
                ))}
            </div>
        </div>
    );
};
