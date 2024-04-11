import { useCallback, useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { TrainingList, TrainingResponse } from '@redux/api/types';

import { TrainingModal } from './training-modal';

import styles from './training-type-cell.module.scss';

type TrainingTypeCellProps = {
    type: string;
    training: TrainingResponse;
    trainingList: TrainingList;
    onEdit: (training: TrainingResponse) => void;
};

export const TrainingTypeCell = ({
    type,
    training,
    trainingList,
    onEdit,
}: TrainingTypeCellProps) => {
    const [showModal, setShowModal] = useState(false);
    const cellRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setShowModal(true);
        }
    };

    const closeModal = useCallback(() => {
        if (showModal) {
            setShowModal(false);
        }
    }, [showModal]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    return (
        <div className={styles.wrapper}>
            <TrainingTypeBadge type={type} className={styles.badge} />
            <div
                className={styles.name_block}
                onClick={() => setShowModal(true)}
                role='button'
                onKeyDown={handleKeyDown}
                tabIndex={0}
                ref={cellRef}
            >
                <div>{training.name}</div>
                <DownOutlined style={{ fontSize: 10 }} />
                {showModal && (
                    <TrainingModal
                        training={training}
                        trainingList={trainingList}
                        onClose={closeModal}
                        onEdit={onEdit}
                    />
                )}
            </div>
        </div>
    );
};
