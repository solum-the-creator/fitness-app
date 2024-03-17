import styles from './training-modal.module.scss';

import { useEffect, useRef, useState } from 'react';
import { Moment } from 'moment';
import { TrainingDisplay } from './training-display';
import { TrainingCreate } from './training-create';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { missingTrainings } from '@utils/missing-trainings';

type TrainingModalProps = {
    onClose: () => void;
    fullscreen: boolean;
    weekDay: number;
    position: { top: number; left: number; right: number; bottom: number };
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
    const [isLeftSide, setIsLeftSide] = useState(weekDay % 7 !== 0);

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

    const handleCreateTraining = () => {
        setEditableTraining(undefined);
        setIsTrainingCreateVisible(true);
    };

    const handleEditTraining = (training: TrainingResponse) => {
        setEditableTraining(training);
        setIsTrainingCreateVisible(true);
    };

    useEffect(() => {
        const handleResize = () => {
            if (modalRef.current) {
                const { right } = modalRef.current.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                if (isLeftSide) {
                    if (right + 20 > windowWidth) {
                        setIsLeftSide(false);
                    }
                }
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isLeftSide]);

    return (
        <div
            className={`${modalClass} ${styles.modal}`}
            style={{ ...positionModal, position: fullscreen ? 'absolute' : 'fixed' }}
            ref={modalRef}
            onClick={handleModalClick}
            data-test-id='modal-create-training'
        >
            <div data-test-id='modal-create-exercise'>
                {isTrainingCreateVisible ? (
                    <TrainingCreate
                        trainingList={missingTrainings(trainingList, trainings)}
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
