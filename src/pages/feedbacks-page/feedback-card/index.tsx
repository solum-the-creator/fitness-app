import { Avatar, Rate } from 'antd';
import styles from './feedback-card.module.scss';
import { Feedback } from '@redux/api/interfaces';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';

import { format } from 'date-fns';

type FeedbackCardProps = Feedback;

export const FeedbackCard = ({
    fullName,
    imageSrc,
    message,
    createdAt,
    rating,
}: FeedbackCardProps) => {
    return (
        <div className={styles.feedback_card}>
            <div className={styles.comment_content_author}>
                <div className={styles.image_container}>
                    <Avatar
                        src={imageSrc}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                        size={42}
                    />
                </div>
                <p className={styles.name_author}>{fullName || 'Пользователь'}</p>
            </div>
            <div className={styles.comment_content}>
                <div className={styles.comment_header}>
                    <Rate
                        disabled
                        defaultValue={rating}
                        character={<StarTwoTone style={{ fontSize: '14px' }} />}
                        style={{ fontSize: '14px' }}
                        className={styles.rating}
                    />
                    <span className={styles.date}>{format(new Date(createdAt), 'dd.MM.yyyy')}</span>
                </div>
                <p className={styles.comment_message}>{message || ''}</p>
            </div>
        </div>
    );
};
