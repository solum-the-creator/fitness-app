import styles from './profile-page.module.scss';

import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { Header } from './header';

export const ProfilePage = () => {
    const user = useAppSelector(userSelector);

    console.log(user);

    return (
        <div className={styles.main_container}>
            <Header title='Профиль' />
        </div>
    );
};
