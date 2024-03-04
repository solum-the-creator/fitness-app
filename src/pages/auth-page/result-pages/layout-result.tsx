import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styles from './layout-result.module.scss';
import { Content } from 'antd/lib/layout/layout';
import PATHS from '@constants/paths';

export const LayoutResult = () => {
    const location = useLocation();

    const fromResult: boolean = location.state?.fromResult;

    return fromResult ? (
        <Content className={styles.content}>
            <Outlet />
        </Content>
    ) : (
        <Navigate to={PATHS.AUTH} replace />
    );
};
