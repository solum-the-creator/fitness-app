import { Outlet } from 'react-router-dom';
import styles from './layout-result.module.scss';
import { Content } from 'antd/lib/layout/layout';

export const LayoutResult = () => {
    return (
        <Content className={styles.content}>
            <Outlet />
        </Content>
    );
};
