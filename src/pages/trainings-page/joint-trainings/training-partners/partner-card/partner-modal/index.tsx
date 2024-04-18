import React, { useState } from 'react';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { ErrorSaveDataModal } from '@components/modals/error-save-data-modal';
import { avatarStyles, COLORS } from '@constants/styles';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useDeleteInviteMutation } from '@redux/api/api-slice';
import { useAppDispatch } from '@redux/configure-store';
import { deleteTrainingPartner } from '@redux/training-partners/training-partners-slice';
import { Avatar, Button, Modal } from 'antd';

import styles from './partner-modal.module.scss';

type PartnerModalProps = {
    inviteId: string | null;
    name: string;
    trainingType: string;
    avgWeightInWeek: number;
    imageSrc: string | null;
    open: boolean;
    onClose: () => void;
};

export const PartnerModal = ({
    inviteId,
    name,
    imageSrc,
    trainingType,
    avgWeightInWeek,
    open,
    onClose,
}: PartnerModalProps) => {
    const dispatch = useAppDispatch();
    const [deleteInvite, { isLoading }] = useDeleteInviteMutation();

    const [isErrorOpen, setIsErrorOpen] = useState(false);

    useLoaderLoading(isLoading);

    const handleCloseErrorModal = () => {
        setIsErrorOpen(false);
    };

    const onDelete = async () => {
        if (inviteId) {
            try {
                await deleteInvite(inviteId).unwrap();
                dispatch(deleteTrainingPartner(inviteId));
                onClose();
            } catch {
                onClose();
                setIsErrorOpen(true);
            }
        }
    };

    return (
        <React.Fragment>
            <Modal
                open={open}
                onCancel={onClose}
                centered={true}
                footer={null}
                transitionName=''
                maskTransitionName=''
                maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.5)' }}
                data-test-id='partner-modal'
            >
                <div className={styles.content}>
                    <div className={styles.partner_info}>
                        <Avatar
                            src={imageSrc}
                            icon={<UserOutlined />}
                            style={avatarStyles}
                            size={42}
                        />
                        <p className={styles.partner_name}>{name}</p>
                    </div>
                    <div className={styles.training_info}>
                        <div className={styles.info_label}>Тип тренировки:</div>
                        <div className={styles.info_value}>{trainingType}</div>
                        <div className={styles.info_label}>Средняя нагрузка:</div>
                        <div className={styles.info_value}>{avgWeightInWeek} кг/нед</div>
                    </div>
                    <div className={styles.status}>
                        тренировка одобрена{' '}
                        <CheckCircleFilled style={{ color: COLORS.characterLightSuccess }} />
                    </div>
                    <div className={styles.button_wrapper}>
                        <Button
                            size='large'
                            type='default'
                            className={styles.cancel_button}
                            block={true}
                            onClick={onDelete}
                        >
                            Отменить тренировку
                        </Button>
                    </div>
                </div>
            </Modal>
            <ErrorSaveDataModal isOpen={isErrorOpen} onClose={handleCloseErrorModal} />
        </React.Fragment>
    );
};
