import styles from './most-popular-info.module.scss';

type MostPopularInfoProps = {
    mostPopularTraining: string | null;
    mostPopularExercise: string | null;
};

export const MostPopularInfo = ({
    mostPopularTraining,
    mostPopularExercise,
}: MostPopularInfoProps) => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <p className={styles.title}>
                Самая частая
                <br />
                тренировка
            </p>
            <span className={styles.value}>{mostPopularTraining?.toLowerCase()}</span>

            <p className={styles.title}>
                Самое частое
                <br />
                упражнение
            </p>
            <span className={styles.value}>{mostPopularExercise}</span>
        </div>
    </div>
);
