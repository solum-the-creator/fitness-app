import styles from './result.module.scss';
import { Button, Layout, Typography } from 'antd';

import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';

interface ResultProps {
    type: 'warning' | 'error' | 'success';
    title: string;
    icon: React.ReactElement<IconBaseProps>;
    children?: React.ReactNode;
}

export const Result = ({ icon, title, type, children }: ResultProps) => {
    const colorStyle = {
        warning: styles.warning,
        error: styles.error,
        success: styles.success,
    };

    return (
        <div className={styles.result_container}>
            <Layout className={styles.result}>
                <div className={`${styles.icon_container} ${colorStyle[type]}`}>{icon}</div>
                <div className={styles.text_container}>
                    <Typography.Title level={3} className={styles.title}>
                        {title}
                    </Typography.Title>
                    <Typography.Paragraph type='secondary' className={styles.text}>
                        {children}
                    </Typography.Paragraph>
                </div>

                <Button type='primary' size='large' block className={styles.button}>
                    Повторить
                </Button>
            </Layout>
        </div>
    );
};
