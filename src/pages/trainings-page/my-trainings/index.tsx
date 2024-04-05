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
    const [alertMessage, setAlertMessage] = useState('');

    const [editableTraining, setEditableTraining] = useState<TrainingResponse | undefined>(
        undefined,
    );

    const trainingDates = trainings.map((training) => moment(training.date));
    const isEmpty = trainings.length === 0;

    const openDrawer = () => setIsDrawerOpen(true);

    const openEditableDrawer = (training: TrainingResponse) => {
        setEditableTraining(training);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setEditableTraining(undefined);
    };

    const showAlertTraining = (message: string) => {
        setAlertMessage(message);
        setIsAlertNewTrainingVisible(true);
    };

    return (
        <div className={styles.main_container}>
            {isEmpty ? (
                <EmptyTrainings onCreate={openDrawer} />
            ) : (
                <TrainingsTable
                    onCreate={openDrawer}
                    onEdit={openEditableDrawer}
                    trainingList={trainingList}
                    trainings={trainings}
                />
            )}
            {isDrawerOpen && (
                <TrainingDrawer
                    isOpen={isDrawerOpen}
                    trainingList={trainingList}
                    trainingDates={trainingDates}
                    training={editableTraining}
                    showAlertTraining={showAlertTraining}
                    onClose={closeDrawer}
                />
            )}

            {isAlertNewTrainingVisible && (
                <Alert
                    message={alertMessage}
                    showIcon={true}
                    type='success'
                    className={styles.alert}
                    closable={true}
                    onClose={() => setIsAlertNewTrainingVisible(false)}
                    data-test-id='create-training-success-alert'
                />
            )}
        </div>
    );
};
