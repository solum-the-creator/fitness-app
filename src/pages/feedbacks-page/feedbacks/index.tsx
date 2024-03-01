import { Feedback } from '@redux/api/interfaces';
import styles from './feedbacks.module.scss';
import { FeedbackCard } from '../feedback-card';
import { Button } from 'antd';
import { useEffect, useRef } from 'react';

type FeedbacksProps = {
    feedbacks: Feedback[];
    showAll: boolean;
    onShowAll: () => void;
    onShowFeedbackModal: () => void;
};

export const Feedbacks = ({
    feedbacks,
    showAll,
    onShowAll,
    onShowFeedbackModal,
}: FeedbacksProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showAll) {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }
    }, [feedbacks, showAll]);

    return (
        <div className={styles.content_container}>
            <div className={styles.feedbacks_container} ref={containerRef}>
                {feedbacks.map((feedback) => (
                    <FeedbackCard {...feedback} key={feedback.id} />
                ))}
            </div>
            <div className={styles.button_container}>
                <Button
                    type='primary'
                    size='large'
                    className={styles.feedback_button}
                    data-test-id='write-review'
                    onClick={onShowFeedbackModal}
                >
                    Написать отзыв
                </Button>
                <Button
                    type='link'
                    size='large'
                    className={styles.show_button}
                    onClick={onShowAll}
                    data-test-id='all-reviews-button'
                >
                    {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </div>
    );
};
