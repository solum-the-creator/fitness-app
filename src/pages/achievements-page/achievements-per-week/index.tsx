import { useState } from 'react';
import { TagsList } from '@components/tags-list';
import { TAG_ALL } from '@constants/constants';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { getDataForWeek } from '@utils/trainings';

import { AverageWorkloadBlock } from './average-workload-block';
import { ColumnPerWeek } from './column-per-week';
import { ExercisePieChart } from './exercise-pie-chart';
import { GeneralInfo } from './general-info';
import { MostPopularExercises } from './most-popular-exercises';
import { MostPopularInfo } from './most-popular-info';

import styles from './achievements-per-week.module.scss';

type AchievementsPerWeekProps = {
    trainings: TrainingResponse[];
    trainingList: TrainingList;
};

export const AchievementsPerWeek = ({ trainings, trainingList }: AchievementsPerWeekProps) => {
    const tagsData = [TAG_ALL, ...trainingList];

    const [selectedTag, setSelectedTag] = useState<string>(tagsData[0].key);

    const {
        totalWorkload,
        dailyWorkload,
        totalReplays,
        totalApproaches,
        mostPopularTraining,
        mostPopularExercise,
        columnData: data,
    } = getDataForWeek(trainings);

    const testData = [
        {
            date: '2024-04-16',
            name: 'Упражнение 1',
        },
        {
            date: '2024-04-17',
            name: 'Упражнение 2',
        },
        {
            date: '2024-04-18',
            name: 'Упражнение 3',
        },
        {
            date: '2024-04-19',
            name: 'Упражнение 4',
        },
        {
            date: '2024-04-20',
            name: 'Упражнение 5',
        },
        {
            date: '2024-04-21',
            name: 'Упражнение 6',
        },
        {
            date: '2024-04-22',
        },
    ];

    return (
        <div className={styles.container}>
            <TagsList
                title='Тип тренировки '
                tagsData={tagsData}
                selectedTag={selectedTag}
                onChange={setSelectedTag}
            />
            <div className={styles.workload_block}>
                <ColumnPerWeek data={data} />
                <AverageWorkloadBlock data={data} />
            </div>
            <GeneralInfo
                totalWorkload={totalWorkload}
                dailyWorkload={dailyWorkload}
                totalReplays={totalReplays}
                totalApproaches={totalApproaches}
            />
            <MostPopularInfo
                mostPopularTraining={mostPopularTraining}
                mostPopularExercise={mostPopularExercise}
            />
            <div className={styles.exercise_block}>
                <ExercisePieChart />
                <MostPopularExercises data={testData} />
            </div>
        </div>
    );
};
