import { useGetTariffListQuery } from '@redux/api/api-slice';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';

import { Header } from './header';

import styles from './settings-page.module.scss';

export const SettingsPage = () => {
    const user = useAppSelector(userSelector);
    const { data: tariffList = [] } = useGetTariffListQuery();

    console.log(tariffList);

    return (
        <div className={styles.wrapper}>
            <Header />
        </div>
    );
};
