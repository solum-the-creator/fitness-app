import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';

import { Header } from './header';

import styles from './settings-page.module.scss';

export const SettingsPage = () => {
    const user = useAppSelector(userSelector);

    return (
        <div className={styles.wrapper}>
            <Header />
        </div>
    );
};
