import { TrainingList, TrainingResponse } from '@redux/api/types';
import styles from './cell-item.module.scss';
import { useMediaQuery } from 'react-responsive';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { TrainingModal } from '../training-modal';
import { Moment } from 'moment';

type CellItemProps = {
    cellId: string;
    selectedTrainings: TrainingResponse[];
    trainingList: TrainingList;
    showModal: boolean;
    date: Moment;
    modalPostion: { top: number; left: number; right: number; bottom: number };
    handleModalClose: () => void;
};

export const CellItem = ({
    cellId,
    selectedTrainings,
    showModal,
    trainingList,
    date,
    modalPostion,
    handleModalClose,
}: CellItemProps) => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });

    return (
        <>
            <div id={cellId} className={styles.calendar_cell}>
                {selectedTrainings.map((training) => {
                    return matches ? (
                        <div key={training._id} className='mobile_cell'></div>
                    ) : (
                        <TrainingTypeBadge
                            key={training._id}
                            type={
                                trainingList.find((item) => item.name === training.name)?.key ||
                                'default'
                            }
                            text={training.name}
                            size='small'
                            disabled={training.isImplementation}
                        />
                    );
                })}
            </div>
            {showModal && (
                <TrainingModal
                    trainingList={trainingList}
                    trainings={selectedTrainings}
                    fullscreen={!matches}
                    weekDay={date.day()}
                    onClose={handleModalClose}
                    position={modalPostion}
                    selectedDate={date}
                />
            )}
        </>
    );
};
