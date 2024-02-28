import { Breadcrumb, Layout } from 'antd';
import styles from './plain-header.module.scss';

type PlainHeaderProps = {
    breadCrumbs: string[];
};

export const PlainHeader = ({ breadCrumbs }: PlainHeaderProps) => {
    return (
        <Layout.Header className={styles.header}>
            <Breadcrumb>
                {breadCrumbs.map((crumb) => (
                    <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </Layout.Header>
    );
};
