import { useState } from 'react';
import { TagsList } from '@components/tags-list';
import { TAG_ALL } from '@constants/constants';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { getDataForWeek } from '@utils/trainings';

import { AverageWorkloadBlock } from './average-workload-block';
import { ColumnPerWeek } from './column-per-week';
import { GeneralInfo } from './general-info';

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
        columnData: data,
    } = getDataForWeek(trainings);

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
        </div>
    );
};
