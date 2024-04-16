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

    const filteredTrainings = trainings.filter((training) => {
        if (selectedTag === TAG_ALL.key) {
            return true;
        }

        return tagsData.some((item) => item.key === selectedTag && item.name === training.name);
    });

    const {
        totalWorkload,
        dailyWorkload,
        totalReplays,
        totalApproaches,
        mostPopularTraining,
        mostPopularExercise,
        mostPopularExerciseForEachDay,
        columnData: data,
    } = getDataForWeek(filteredTrainings);

    return (
        <div className={styles.container}>
            <TagsList
                title='Тип тренировки '
                tagsData={tagsData}
                selectedTag={selectedTag}
                onChange={setSelectedTag}
            />
            <div className={styles.content}>
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
                    mostPopularExercise={mostPopularExercise && mostPopularExercise.name}
                />
                <div className={styles.exercise_block}>
                    <ExercisePieChart data={mostPopularExerciseForEachDay} />
                    <MostPopularExercises data={mostPopularExerciseForEachDay} />
                </div>
            </div>
        </div>
    );
};
