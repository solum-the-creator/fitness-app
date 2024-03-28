import { Outlet } from 'react-router-dom';

import styles from './styles/layout.module.scss';

export const Layout = () => (
    <div className={styles.background}>
        <div className={styles.blur_background}>
            <Outlet />
        </div>
    </div>
);
