/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ErrorTrainingDrawer } from '@components/modals/error-training-drawer';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useAddTrainingMutation, useUpdateTrainingMutation } from '@redux/api/api-slice';
import { Exercise, Training, TrainingList, TrainingResponse } from '@redux/api/types';
import { isPastDate } from '@utils/date-utils';
import { filterExerciseList } from '@utils/exercise';
import { Button, Drawer } from 'antd';
import moment, { Moment } from 'moment';

import { DrawerHeader } from './drawer-header';
import { ExerciseList } from './exercise-list';
import { TrainingInfo } from './training-info';

import styles from './training-drawer.module.scss';

type TrainingDrawerProps = {
    isOpen: boolean;
    trainingList: TrainingList;
    trainingDates: Moment[];
    onClose: () => void;
    showAlertTraining: (message: string) => void;
    training?: TrainingResponse;
};

export const TrainingDrawer = ({
    isOpen,
    trainingList,
    trainingDates,
    showAlertTraining,
    onClose,
    training,
}: TrainingDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const isEditable = !!training;

    const [addTraining, { isLoading: isLoadingAdd }] = useAddTrainingMutation();
    const [updateTraining, { isLoading: isLoadingUpdate }] = useUpdateTrainingMutation();
    const [showErrorModal, setShowErrorModal] = useState(false);

    useLoaderLoading(isLoadingAdd || isLoadingUpdate);

    const [trainingName, setTrainingName] = useState<string | undefined>(training?.name);
    const [trainingDate, setTrainingDate] = useState<string | undefined>(training?.date);
    const [withPeriod, setWithPeriod] = useState(training?.parameters?.repeat || false);
    const [trainingPeriod, setTrainingPeriod] = useState<number | undefined>(
        training?.parameters?.period,
    );
    const [exerciseList, setExerciseList] = useState<Array<Partial<Exercise>>>(
        training?.exercises || [],
    );

    const canSaveTraining =
        trainingName && trainingDate && !exerciseList.some((exercise) => exercise.name === '');

    const changeTrainingName = (name?: string) => {
        setTrainingName(name);
    };

    const changeTrainingDate = (date?: string) => {
        setTrainingDate(date);
    };

    const changeWithPeriod = (value: boolean) => {
        setWithPeriod(value);
    };

    const changeTrainingPeriod = (period?: number) => {
        setTrainingPeriod(period);
    };

    const handleExerciseListUpdate = (updatedExerciseList: Array<Partial<Exercise>>) => {
        setExerciseList(updatedExerciseList);
    };

    const handleClose = () => {
        onClose();
        setTrainingName(undefined);
        setTrainingDate(undefined);
        setWithPeriod(false);
        setTrainingPeriod(undefined);
        setExerciseList([]);
        setShowErrorModal(false);
    };

    const saveTraining = async () => {
        if (canSaveTraining) {
            if (isEditable) {
                const editableTraining: Training = {
                    name: trainingName,
                    date: trainingDate,
                    isImplementation: isPastDate(moment(trainingDate)),
                    exercises: filterExerciseList(exerciseList),
                    parameters: {
                        repeat: withPeriod,
                        period: trainingPeriod,
                    },
                };

                try {
                    await updateTraining({ id: training._id, training: editableTraining }).unwrap();
                    showAlertTraining('Тренировка успешно обновлена');
                    handleClose();
                } catch {
                    setShowErrorModal(true);
                }
            } else {
                const newTraining: Training = {
                    name: trainingName,
                    date: trainingDate,
                    isImplementation: false,
                    exercises: filterExerciseList(exerciseList),
                    parameters: {
                        repeat: withPeriod,
                        period: trainingPeriod,
                    },
                };

                try {
                    await addTraining(newTraining).unwrap();
                    showAlertTraining('Новая тренировка успешно добавлена');
                    handleClose();
                } catch {
                    setShowErrorModal(true);
                }
            }
        }
    };

    return (
        <Drawer
            width={matches ? '100%' : 408}
            height={matches ? 555 : '100%'}
            placement={matches ? 'bottom' : 'right'}
            open={isOpen}
            closable={false}
            zIndex={11}
            onClose={handleClose}
            maskStyle={{ backgroundColor: 'transparent' }}
            destroyOnClose={true}
            className={`${styles.drawer} ${drawerClass}`}
            data-test-id='modal-drawer-right'
        >
            <div className={styles.drawer_wrapper}>
                <DrawerHeader onClose={handleClose} isEditable={isEditable} />
                <div className={styles.drawer_body}>
                    <TrainingInfo
                        trainingDates={trainingDates}
                        trainingList={trainingList}
                        trainingName={trainingName}
                        trainingDate={trainingDate}
                        withPeriod={withPeriod}
                        period={trainingPeriod}
                        isEditable={isEditable}
                        changeTrainingName={changeTrainingName}
                        changeTrainingDate={changeTrainingDate}
                        changeWithPeriod={changeWithPeriod}
                        changeTrainingPeriod={changeTrainingPeriod}
                    />
                    <ExerciseList
                        isEditable={isEditable}
                        exerciseList={exerciseList}
                        updateExerciseList={handleExerciseListUpdate}
                    />
                </div>
                <div className={styles.drawer_footer}>
                    <Button
                        block={true}
                        type='primary'
                        size='large'
                        onClick={saveTraining}
                        disabled={!canSaveTraining}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
            <ErrorTrainingDrawer isOpen={showErrorModal} onClose={handleClose} />
        </Drawer>
    );
};
