import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { ErrorTrainingDrawer } from '@components/modals/error-training-drawer';
import { DATE_FORMAT } from '@constants/constants';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useUpdateInviteMutation } from '@redux/api/api-slice';
import { TrainingList, TrainingResponse, UserInvite } from '@redux/api/types';
import { Avatar, Button } from 'antd';
import moment from 'moment';

import { DetailsModal } from './details-modal';

import styles from './message-item.module.scss';

type MessageItemProps = {
    inviteId: string;
    user: UserInvite;
    date: string;
    training: TrainingResponse;
    trainingList: TrainingList;
};

const inviteTrainingText: Record<string, string> = {
    Силовая: '[силовых тренировок]',
    Руки: '[тренировок на руки]',
    Ноги: '[тренировок на ноги]',
    Грудь: '[тренировок на грудь]',
    Спина: '[тренировок на спину]',
};

export const MessageItem = ({ inviteId, user, date, training, trainingList }: MessageItemProps) => {
    const [updateInvite, { isLoading }] = useUpdateInviteMutation();

    useLoaderLoading(isLoading);

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const formattedDate = moment(date).format(DATE_FORMAT);
    const name =
        user.firstName && user.lastName ? (
            <React.Fragment>
                <span>{user.firstName}</span> <span>{user.lastName}</span>
            </React.Fragment>
        ) : (
            <span>Пользователь</span>
        );

    const trainingText = inviteTrainingText[training.name] || '';

    const handleUpdateInvite = async (status: 'accepted' | 'rejected') => {
        try {
            await updateInvite({ id: inviteId, status });
        } catch {
            setShowErrorModal(true);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.user_info}>
                <div className={styles.image_container}>
                    <Avatar
                        src={user.imageSrc}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                        size={42}
                    />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.text_container}>
                <div className={styles.date}>{formattedDate}</div>
                <p className={styles.text}>
                    Привет, я ищу партнёра для совместных {trainingText}. Ты хочешь присоединиться
                    ко мне на следующих тренировках?
                </p>
                <div className={styles.button_container}>
                    <Button
                        type='link'
                        size='small'
                        className={styles.details_button}
                        onClick={() => setShowDetailsModal(true)}
                    >
                        Посмотреть детали тренировки
                    </Button>
                    {showDetailsModal && (
                        <DetailsModal
                            onClose={() => setShowDetailsModal(false)}
                            training={training}
                            trainingList={trainingList}
                        />
                    )}
                </div>
            </div>
            <div className={styles.actions}>
                <Button
                    type='primary'
                    size='large'
                    className={styles.action_button}
                    onClick={() => handleUpdateInvite('accepted')}
                >
                    Тренироваться вместе
                </Button>
                <Button
                    type='default'
                    size='large'
                    className={styles.action_button}
                    onClick={() => handleUpdateInvite('rejected')}
                >
                    Отклонить запрос
                </Button>
            </div>
            <ErrorTrainingDrawer isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} />
        </div>
    );
};
