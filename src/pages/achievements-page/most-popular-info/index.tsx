import React from 'react';

import styles from './most-popular-info.module.scss';

type MostPopularInfoProps = {
    mostPopularTraining: string | null;
    mostPopularExercise: string | null;
    isFiltered?: boolean;
};

export const MostPopularInfo = ({
    mostPopularTraining,
    mostPopularExercise,
    isFiltered,
}: MostPopularInfoProps) => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            {!isFiltered && (
                <React.Fragment>
                    <p className={styles.title}>
                        Самая частая
                        <br />
                        тренировка
                    </p>
                    <span className={styles.value}>{mostPopularTraining?.toLowerCase()}</span>
                </React.Fragment>
            )}

            <p className={styles.title}>
                Самое частое
                <br />
                упражнение
            </p>
            <span className={styles.value}>{mostPopularExercise}</span>
        </div>
    </div>
);
