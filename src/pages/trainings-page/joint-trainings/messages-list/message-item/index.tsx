import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '@constants/constants';
import { Training, UserInvite } from '@redux/api/types';
import { Avatar, Button } from 'antd';
import moment from 'moment';

import styles from './message-item.module.scss';

type MessageItemProps = {
    user: UserInvite;
    date: string;
    training: Training;
};

const inviteTrainingText: Record<string, string> = {
    Силовая: '[силовых тренировок]',
    Руки: '[тренировок на руки]',
    Ноги: '[тренировок на ноги]',
    Грудь: '[тренировок на грудь]',
    Спина: '[тренировок на спину]',
};

export const MessageItem = ({ user, date, training }: MessageItemProps) => {
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
                <Button type='link' size='small' className={styles.details_button}>
                    Посмотреть детали тренировки
                </Button>
            </div>
            <div className={styles.actions}>
                <Button type='primary' size='large' className={styles.action_button}>
                    Тренироваться вместе
                </Button>
                <Button type='default' size='large' className={styles.action_button}>
                    Отклонить запрос
                </Button>
            </div>
        </div>
    );
};
