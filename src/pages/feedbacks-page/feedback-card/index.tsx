import { ReactNode } from 'react';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { CustomRateCharacter } from '@components/custom-rate-character';
import { DATE_FORMAT_FEEDBACK } from '@constants/constants';
import { avatarStyles } from '@constants/styles';
import { Feedback } from '@redux/api/types';
import { Avatar, Rate, Typography } from 'antd';
import { format } from 'date-fns';

import styles from './feedback-card.module.scss';

type FeedbackCardProps = Feedback;

export const FeedbackCard = ({
    fullName,
    imageSrc,
    message,
    createdAt,
    rating,
}: FeedbackCardProps) => {
    const rateCharacters: Record<number, ReactNode> = {};

    Array.from({ length: 5 }).forEach((_, i) => {
        rateCharacters[i] = i < rating ? <StarFilled /> : <StarOutlined />;
    });

    return (
        <div className={styles.feedback_card}>
            <div className={styles.user_info}>
                <div className={styles.image_container}>
                    <Avatar src={imageSrc} icon={<UserOutlined />} style={avatarStyles} size={42} />
                </div>
                <p className={styles.name_author}>{fullName || 'Пользователь'}</p>
            </div>
            <div className={styles.comment_content}>
                <div className={styles.comment_header}>
                    <Rate
                        disabled={true}
                        defaultValue={rating}
                        character={CustomRateCharacter}
                        style={{ fontSize: '14px' }}
                        className={styles.rating}
                    />
                    <span className={styles.date}>
                        {format(new Date(createdAt), DATE_FORMAT_FEEDBACK)}
                    </span>
                </div>
                <Typography.Paragraph className={styles.comment_message}>
                    {message || ''}
                </Typography.Paragraph>
            </div>
        </div>
    );
};
