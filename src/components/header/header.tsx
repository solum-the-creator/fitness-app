import { Breadcrumb, Button, Layout } from 'antd';

import styles from './header.module.scss';
import Title from 'antd/lib/typography/Title';
import { SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import PATHS from '@constants/paths';

export const Header = () => {
    const matchesMobile = useMediaQuery({ query: `(max-width: 480px)` });

    return (
        <Layout.Header className={styles.header}>
            <Breadcrumb className={styles.breadcrumbs}>
                <Breadcrumb.Item className={styles.breadcrumbs_item}>
                    <Link to={PATHS.MAIN}>Главная</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.horizontal_layout}>
                <Title level={1} className={styles.title}>
                    Приветствуем тебя в&nbsp;CleverFit&nbsp;— приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </Title>

                <Button
                    icon={<SettingOutlined />}
                    type={matchesMobile ? 'default' : 'text'}
                    shape={matchesMobile ? 'circle' : 'default'}
                    className={styles.settings}
                >
                    {!matchesMobile && 'Настройки'}
                </Button>
            </div>
        </Layout.Header>
    );
};
