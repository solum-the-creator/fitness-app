import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styles from './layout-result.module.scss';
import { Content } from 'antd/lib/layout/layout';

export const LayoutResult = () => {
    const location = useLocation();

    const fromResult: boolean = location.state?.fromResult;

    return fromResult ? (
        <Content className={styles.content}>
            <Outlet />
        </Content>
    ) : (
        <Navigate to={'/auth'} replace />
    );
};
