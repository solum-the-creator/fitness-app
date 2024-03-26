import { useGetTariffListQuery } from '@redux/api/api-slice';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { Content } from 'antd/lib/layout/layout';

import { Header } from './header';
import { TariffCard } from './tariff-card';

import styles from './settings-page.module.scss';

import freeTariffImg from '/free_tariff.jpg';
import proTariffImg from '/pro_able_tariff.jpg';
import disabledProTariffImg from '/pro_disable_tariff.jpg';

export const SettingsPage = () => {
    const user = useAppSelector(userSelector);
    const { data: tariffList = [] } = useGetTariffListQuery();

    const proTariff = tariffList[0];

    console.log(proTariff);

    return (
        <div className={styles.wrapper}>
            <Header />
            <Content className={styles.content_container}>
                <div className={styles.content}>
                    <div className={styles.tariff_block}>
                        <h4 className={styles.title}>Мой тариф</h4>
                        <div className={styles.tariff_cards}>
                            <TariffCard
                                title='FREE tariff'
                                isActive={true}
                                imageSrc={freeTariffImg}
                            />
                            <TariffCard
                                title={`${proTariff?.name.toUpperCase()} tariff`}
                                isActive={false}
                                imageSrc={proTariffImg}
                                disabledImageSrc={disabledProTariffImg}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </div>
    );
};
