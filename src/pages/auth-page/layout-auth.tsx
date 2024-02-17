import styles from './layout-auth.module.scss';

import { Content } from 'antd/lib/layout/layout';
import { Outlet } from 'react-router-dom';

export const LayoutAuth = () => {
    return (
        <div className={styles.background}>
            <Content>
                <Outlet />
            </Content>
        </div>
    );
};
