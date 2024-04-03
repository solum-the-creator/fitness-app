import { useState } from 'react';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { Alert } from 'antd';
import moment from 'moment';

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
    const [isAlertNewTrainingVisible, setIsAlertNewTrainingVisible] = useState(false);

    const trainingDates = trainings.map((training) => moment(training.date));
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
                trainingDates={trainingDates}
                showAlertNewTraining={() => setIsAlertNewTrainingVisible(true)}
                onClose={() => setIsDrawerOpen(false)}
            />
            {isAlertNewTrainingVisible && (
                <Alert
                    message='Новая тренировка успешно добавлена'
                    showIcon={true}
                    type='success'
                    className={styles.alert}
                    closable={true}
                    onClose={() => setIsAlertNewTrainingVisible(false)}
                />
            )}
        </div>
    );
};
