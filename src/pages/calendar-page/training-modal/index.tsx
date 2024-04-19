import { useRef, useState } from 'react';
import { useHandleModalResize } from '@hooks/use-handle-modal-resize';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { missingTrainings } from '@utils/trainings';
import { Moment } from 'moment';

import { TrainingCreate } from './training-create';
import { TrainingDisplay } from './training-display';

import styles from './training-modal.module.scss';

export type ModalPosition = {
    top: number;
    left: number;
    right: number;
    bottom: number;
};

type TrainingModalProps = {
    onClose: () => void;
    fullscreen: boolean;
    weekDay: number;
    position: ModalPosition;
    selectedDate: Moment;
    trainingList: TrainingList;
    trainings: TrainingResponse[];
};

export const TrainingModal = ({
    onClose,
    fullscreen,
    weekDay,
    position,
    selectedDate,
    trainingList,
    trainings,
}: TrainingModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const { isLeftSide } = useHandleModalResize(weekDay, modalRef);

    const [isTrainingCreateVisible, setIsTrainingCreateVisible] = useState(false);
    const [editableTraining, setEditableTraining] = useState<TrainingResponse | undefined>(
        undefined,
    );

    const positionFullscreen = isLeftSide ? { top: 0, left: 0 } : { top: 0, right: 0 };
    const positionMobile = { top: position.bottom };
    const positionModal = fullscreen ? positionFullscreen : positionMobile;

    const modalClass = fullscreen ? styles.fullscreen_modal : styles.mobile_modal;

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleCreateTraining = () => {
        setEditableTraining(undefined);
        setIsTrainingCreateVisible(true);
    };

    const handleEditTraining = (training: TrainingResponse) => {
        setEditableTraining(training);
        setIsTrainingCreateVisible(true);
    };

    return (
        <div
            className={`${modalClass} ${styles.modal}`}
            style={{ ...positionModal, position: fullscreen ? 'absolute' : 'fixed' }}
            ref={modalRef}
            onKeyDown={handleOnKeyDown}
            onClick={handleModalClick}
            role='button'
            tabIndex={0}
            data-test-id='modal-create-training'
        >
            <div data-test-id='modal-create-exercise'>
                {isTrainingCreateVisible ? (
                    <TrainingCreate
                        trainingList={missingTrainings(trainingList, trainings)}
                        trainings={trainings}
                        onCancel={() => setIsTrainingCreateVisible(false)}
                        onClose={onClose}
                        date={selectedDate}
                        editableTraining={editableTraining}
                    />
                ) : (
                    <TrainingDisplay
                        onClose={onClose}
                        onCreate={handleCreateTraining}
                        onEdit={handleEditTraining}
                        selectedDate={selectedDate}
                        trainings={trainings}
                        trainingList={trainingList}
                    />
                )}
            </div>
        </div>
    );
};
