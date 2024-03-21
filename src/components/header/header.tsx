import { Link } from 'react-router-dom';
import { SettingsButton } from '@components/buttons/settings-button';
import { Breadcrumb, Layout } from 'antd';
import Title from 'antd/lib/typography/Title';

import styles from './header.module.scss';

type HeaderProps = {
    title?: React.ReactNode | string;
    breadCrumbs?: [{ title: string; link: string }];
};

export const Header = ({ breadCrumbs, title }: HeaderProps) => (
    <Layout.Header className={styles.header}>
        <Breadcrumb className={styles.breadcrumbs}>
            {breadCrumbs?.map((crumb) => (
                <Breadcrumb.Item className={styles.breadcrumbs_item} key={crumb.link}>
                    <Link to={crumb.link}>{crumb.title}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <div className={styles.horizontal_layout}>
            {title && (
                <Title level={1} className={styles.title}>
                    {title}
                </Title>
            )}
            <Title level={1} className={styles.title} />

            <SettingsButton />
        </div>
    </Layout.Header>
);
