import { Link } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';

import styles from './plain-header.module.scss';

type PlainHeaderProps = {
    breadCrumbs: Array<{
        title: string;
        link: string;
    }>;
};

export const PlainHeader = ({ breadCrumbs }: PlainHeaderProps) => (
    <Layout.Header className={styles.header}>
        <Breadcrumb>
            {breadCrumbs.map((crumb) => (
                <Breadcrumb.Item key={crumb.link}>
                    <Link to={crumb.link}>{crumb.title}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    </Layout.Header>
);
