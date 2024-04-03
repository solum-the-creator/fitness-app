import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ErrorTrainingDrawer } from '@components/modals/error-training-drawer';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useAddTrainingMutation } from '@redux/api/api-slice';
import { Exercise, Training, TrainingList } from '@redux/api/types';
import { filterExerciseList } from '@utils/exercise';
import { Button, Drawer } from 'antd';
import { Moment } from 'moment';

import { DrawerHeader } from './drawer-header';
import { ExerciseList } from './exercise-list';
import { TrainingInfo } from './training-info';

import styles from './training-drawer.module.scss';

type TrainingDrawerProps = {
    isOpen: boolean;
    trainingList: TrainingList;
    trainingDates: Moment[];
    onClose: () => void;
    showAlertNewTraining: () => void;
    isEditable?: boolean;
};

export const TrainingDrawer = ({
    isOpen,
    trainingList,
    trainingDates,
    showAlertNewTraining,
    onClose,
    isEditable,
}: TrainingDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const [addTraining, { isLoading: isLoadingAdd }] = useAddTrainingMutation();
    const [showErrorModal, setShowErrorModal] = useState(false);

    useLoaderLoading(isLoadingAdd);

    const [trainingName, setTrainingName] = useState<string | undefined>(undefined);
    const [trainingDate, setTrainingDate] = useState<string | undefined>(undefined);
    const [withPeriod, setWithPeriod] = useState(false);
    const [trainingPeriod, setTrainingPeriod] = useState<number | undefined>();
    const [exerciseList, setExerciseList] = useState<Array<Partial<Exercise>>>([]);

    const canSaveTraining = trainingName && trainingDate;

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
            const training: Training = {
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
                await addTraining(training).unwrap();
                showAlertNewTraining();
                handleClose();
            } catch {
                setShowErrorModal(true);
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
                        changeTrainingName={changeTrainingName}
                        changeTrainingDate={changeTrainingDate}
                        changeWithPeriod={changeWithPeriod}
                        changeTrainingPeriod={changeTrainingPeriod}
                    />
                    <ExerciseList
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
