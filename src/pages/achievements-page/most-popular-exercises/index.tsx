import { PopularExercise } from '@utils/exercise';

import { ExerciseItem } from './exercise-item';

import styles from './most-popular-exercises.module.scss';

type MostPopularExercisesProps = {
    data: Array<{
        dayOfWeek: number;
        mostPopularExercise: PopularExercise | null;
    }>;
};

export const MostPopularExercises = ({ data }: MostPopularExercisesProps) => {
    const sortedData = [...data].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

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
                        key={item.dayOfWeek}
                        dayOfWeek={item.dayOfWeek}
                        name={item.mostPopularExercise && item.mostPopularExercise.name}
                    />
                ))}
            </div>
        </div>
    );
};
