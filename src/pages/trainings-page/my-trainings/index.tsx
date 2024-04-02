import { useState } from 'react';
import { TrainingList, TrainingResponse } from '@redux/api/types';

import { EmptyTrainings } from './empty-trainings';
import { TrainingDrawer } from './training-drawer';
import { TrainingsTable } from './trainings-table';

import styles from './my-trainings.module.scss';

type MyTrainingsProps = {
    trainings: TrainingResponse[];
    trainingList: TrainingList;
};

export const MyTrainings = ({ trainings, trainingList }: MyTrainingsProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isEmpty = trainings.length === 0;

    const openDrawer = () => setIsDrawerOpen(true);

    return (
        <div className={styles.main_container}>
            {isEmpty ? (
                <EmptyTrainings onCreate={openDrawer} />
            ) : (
                <TrainingsTable onCreate={openDrawer} trainings={trainings} />
            )}
            <TrainingDrawer
                isOpen={isDrawerOpen}
                trainingList={trainingList}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};
