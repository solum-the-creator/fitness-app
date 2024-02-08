import { Breadcrumb, Button, Layout, Space } from 'antd';

import styles from './header.module.scss';
import Title from 'antd/lib/typography/Title';
import { SettingOutlined } from '@ant-design/icons';

export const Header = () => {
    return (
        <Layout.Header className={styles.header}>
            <Breadcrumb className={styles.breadcrumbs}>
                <Breadcrumb.Item className={styles.breadcrumbs_item}>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.horizontal_layout}>
                <Title level={1} className={styles.title}>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>

                <Button icon={<SettingOutlined />} type='text' className={styles.settings}>
                    Настройки
                </Button>
            </div>
        </Layout.Header>
    );
};
