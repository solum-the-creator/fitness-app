import { Breadcrumb, Layout } from 'antd';
import styles from './base-header.module.scss';
import { Link } from 'react-router-dom';
import { SettingsButton } from '@components/buttons/settings-button';

type BaseHeaderProps = {
    breadCrumbs: {
        title: string;
        link: string;
    }[];
};

export const BaseHeader = ({ breadCrumbs }: BaseHeaderProps) => (
    <Layout.Header className={styles.header}>
        <Breadcrumb>
            {breadCrumbs.map((crumb) => (
                <Breadcrumb.Item key={crumb.link}>
                    <Link to={crumb.link}>{crumb.title}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <div className={styles.horizontal_layout}>
            <SettingsButton />
        </div>
    </Layout.Header>
);
