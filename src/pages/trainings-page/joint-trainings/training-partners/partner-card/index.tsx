import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { PartnerModal } from './partner-modal';

import styles from './partner-card.module.scss';

type PartnerCardProps = {
    inviteId: string | null;
    name: string;
    imageSrc: string | null;
    trainingType: string;
    avgWeightInWeek: number;
    index: number;
};

export const PartnerCard = ({
    inviteId,
    name,
    avgWeightInWeek,
    imageSrc,
    trainingType,
    index,
}: PartnerCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setIsModalOpen(true);
        }
    };

    return (
        <React.Fragment>
            <div
                className={styles.partner_card}
                onClick={handleOpenModal}
                role='button'
                onKeyDown={handleKeyDown}
                tabIndex={0}
                data-test-id={`joint-training-cards${index}`}
            >
                <div className={styles.partner_info}>
                    <Avatar
                        src={imageSrc}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                        size={42}
                    />
                    <p className={styles.partner_name}>{name}</p>
                </div>
                <div className={styles.training_info}>
                    <div className={styles.label_row}>
                        <span className={styles.info_label}>Тип тренировки:</span>
                        <span className={styles.info_label}>Средняя нагрузка:</span>
                    </div>
                    <div className={styles.info_row}>
                        <span className={styles.info_value}>{trainingType}</span>
                        <span className={styles.info_value}>{avgWeightInWeek} кг/нед</span>
                    </div>
                </div>
            </div>
            <PartnerModal
                inviteId={inviteId}
                open={isModalOpen}
                onClose={handleCloseModal}
                name={name}
                imageSrc={imageSrc}
                trainingType={trainingType}
                avgWeightInWeek={avgWeightInWeek}
            />
        </React.Fragment>
    );
};
