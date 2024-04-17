import { useState } from 'react';
import { TagsList } from '@components/tags-list';
import { TAG_ALL } from '@constants/constants';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { getDataForMonth, getDataStats } from '@utils/trainings';

import { EmptyTraining } from '../empty-training';

import { ColumnPerMonth } from './column-per-month';

import styles from './achievements-per-month.module.scss';

type AchievementsPerMonthProps = {
    trainings: TrainingResponse[];
    trainingList: TrainingList;
};

export const AchievementsPerMonth = ({ trainings, trainingList }: AchievementsPerMonthProps) => {
    const tagsData = [TAG_ALL, ...trainingList];

    const [selectedTag, setSelectedTag] = useState<string>(tagsData[0].key);
    const isFiltered = selectedTag !== TAG_ALL.key;

    const filteredTrainings = trainings.filter((training) => {
        if (isFiltered) {
            return tagsData.some((item) => item.key === selectedTag && item.name === training.name);
        }

        return true;
    });

    const {
        isEmpty,
        totalWorkload,
        dailyWorkload,
        totalReplays,
        totalApproaches,
        mostPopularTraining,
        mostPopularExercise,
        mostPopularExerciseForEachDay,
        columnData: data,
    } = getDataStats(filteredTrainings, true);

    return (
        <div className={styles.container}>
            <TagsList
                title='Тип тренировки '
                tagsData={tagsData}
                selectedTag={selectedTag}
                onChange={setSelectedTag}
            />
            {isEmpty ? (
                <EmptyTraining />
            ) : (
                <div className={styles.content}>
                    <div className={styles.workload_block}>
                        <ColumnPerMonth data={data} />
                        {/* <AverageDaylyWorkload data={data} /> */}
                    </div>
                    {/* <GeneralInfo
                        totalWorkload={totalWorkload}
                        dailyWorkload={dailyWorkload}
                        totalReplays={totalReplays}
                        totalApproaches={totalApproaches}
                    />
                    <MostPopularInfo
                        isFiltered={isFiltered}
                        mostPopularTraining={mostPopularTraining}
                        mostPopularExercise={mostPopularExercise && mostPopularExercise.name}
                    />
                    <div className={styles.exercise_block}>
                        <ExercisePieChart data={mostPopularExerciseForEachDay} />
                        <MostPopularExercises data={mostPopularExerciseForEachDay} />
                    </div> */}
                </div>
            )}
        </div>
    );
};
