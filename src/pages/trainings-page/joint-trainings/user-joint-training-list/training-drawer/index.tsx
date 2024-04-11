/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ErrorTrainingDrawer } from '@components/modals/error-training-drawer';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useAddInviteMutation, useAddTrainingMutation } from '@redux/api/api-slice';
import { Exercise, Training, TrainingList, TrainingPartner } from '@redux/api/types';
import { useAppDispatch } from '@redux/configure-store';
import { updateUserInJointList } from '@redux/user-joint-list/user-joint-list-slice';
import { filterExerciseList } from '@utils/exercise';
import { Button, Drawer } from 'antd';
import { Moment } from 'moment';

import { DrawerHeader } from './drawer-header';
import { ExerciseList } from './exercise-list';
import { PartnerInfo } from './partner-info';
import { TrainingInfo } from './training-info';

import styles from './training-drawer.module.scss';

type TrainingDrawerProps = {
    trainingPartner: TrainingPartner;
    trainingList: TrainingList;
    isOpen: boolean;
    trainingDates: Moment[];
    onClose: () => void;
};

export const TrainingDrawer = ({
    trainingPartner,
    trainingList,
    isOpen,
    trainingDates,
    onClose,
}: TrainingDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const dispatch = useAppDispatch();

    const [addTraining, { isLoading: isLoadingAdd }] = useAddTrainingMutation();
    const [addInvite, { isLoading: isLoadingInvite }] = useAddInviteMutation();

    const [showErrorModal, setShowErrorModal] = useState(false);

    useLoaderLoading(isLoadingAdd || isLoadingInvite);

    const [trainingDate, setTrainingDate] = useState<string | undefined>(undefined);
    const [withPeriod, setWithPeriod] = useState(false);
    const [trainingPeriod, setTrainingPeriod] = useState<number | undefined>(undefined);
    const [exerciseList, setExerciseList] = useState<Array<Partial<Exercise>>>([]);

    const canSaveTraining = trainingDate && !exerciseList.some((exercise) => exercise.name === '');

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
        setTrainingDate(undefined);
        setWithPeriod(false);
        setTrainingPeriod(undefined);
        setExerciseList([]);
        setShowErrorModal(false);
    };

    const saveTraining = async () => {
        if (canSaveTraining) {
            const newTraining: Training = {
                name: trainingPartner.trainingType,
                date: trainingDate,
                isImplementation: false,
                exercises: filterExerciseList(exerciseList),
                parameters: {
                    repeat: withPeriod,
                    period: trainingPeriod,
                    jointTraining: true,
                },
            };

            try {
                const addedTraining = await addTraining(newTraining).unwrap();

                await addInvite({ to: trainingPartner.id, trainingId: addedTraining._id }).unwrap();

                dispatch(updateUserInJointList({ id: trainingPartner.id, status: 'pending' }));
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
            data-test-id='modal-drawer-right'
        >
            <div className={styles.drawer_wrapper}>
                <DrawerHeader onClose={handleClose} />
                <div className={styles.drawer_body}>
                    <PartnerInfo
                        name={trainingPartner.name}
                        imageSrc={trainingPartner.imageSrc}
                        trainingType={trainingPartner.trainingType}
                        trainingList={trainingList}
                    />
                    <TrainingInfo
                        trainingDates={trainingDates}
                        trainingDate={trainingDate}
                        withPeriod={withPeriod}
                        period={trainingPeriod}
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
                        Отправить приглашение
                    </Button>
                </div>
            </div>
            <ErrorTrainingDrawer isOpen={showErrorModal} onClose={handleClose} />
        </Drawer>
    );
};
