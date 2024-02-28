import { RootState } from '@redux/configure-store';
import styles from './feedback.module.scss';

import { PlainHeader } from '@components/header/plain-header';
import { Button, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

export const FeedbacksPage = () => {
    const matches = useMediaQuery({ query: `(max-width: 768px)` });
    const isSiderCollapsed = useSelector((state: RootState) => state.sider.isCollapsed);
    const extraPadding = isSiderCollapsed ? styles.extra_padding : styles.no_extra_padding;

    return (
        <Layout className={styles.main_container}>
            <PlainHeader breadCrumbs={['Главная', 'Отзывы пользователей']} />
            <Content className={styles.content}>
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
            </Content>
        </Layout>
    );
};
