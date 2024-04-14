import { useState } from 'react';
import { TagsList } from '@components/tags-list';
import { TAG_ALL } from '@constants/constants';
import { TrainingList } from '@redux/api/types';

import styles from './achievements-per-month.module.scss';

type AchievementsPerMonthProps = {
    trainingList: TrainingList;
};

export const AchievementsPerMonth = ({ trainingList }: AchievementsPerMonthProps) => {
    const tagsData = [TAG_ALL, ...trainingList];

    const [selectedTag, setSelectedTag] = useState<string>(tagsData[0].key);

    return (
        <div className={styles.container}>
            <TagsList
                title='Тип тренировки '
                tagsData={tagsData}
                selectedTag={selectedTag}
                onChange={setSelectedTag}
            />
        </div>
    );
};
