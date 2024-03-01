import { Button } from 'antd';
import styles from './empty-feedbacks.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

export const EmptyFeedbacks = () => {
    const matches = useMediaQuery({ query: `(max-width: 768px)` });
    const isSiderCollapsed = useSelector((state: RootState) => state.sider.isCollapsed);
    const extraPadding = isSiderCollapsed ? styles.extra_padding : styles.no_extra_padding;

    return (
        <div className={styles.empty_container}>
            <div className={`${styles.keep_feedback_container} ${extraPadding}`}>
                <div className={styles.keep_feedback}>
                    <h3 className={styles.title}>Оставьте свой отзыв первым</h3>
                    <p className={styles.description}>
                        Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                        <br />
                        Поделитесь своим мнением и опытом с другими пользователями,
                        <br />и помогите им сделать правильный выбор.
                    </p>
                </div>
            </div>
            <Button type='primary' size='large' className={styles.button} block={matches}>
                Написать отзыв
            </Button>
        </div>
    );
};
