import { useState } from 'react';
import { useGetTariffListQuery } from '@redux/api/api-slice';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { Header } from './header';
import { SwitchItem } from './switch-item';
import { TariffCard } from './tariff-card';
import { TariffDrawer } from './tariff-drawer';

import styles from './settings-page.module.scss';

import freeTariffImg from '/free_tariff.jpg';
import proTariffImg from '/pro_able_tariff.jpg';
import disabledProTariffImg from '/pro_disable_tariff.jpg';

export const SettingsPage = () => {
    const user = useAppSelector(userSelector);
    const { data: tariffList } = useGetTariffListQuery();
    const proTariff = tariffList && tariffList[0];

    const [isTariffDrawerOpen, setIsTariffDrawerOpen] = useState(false);

    const handleMoreClick = () => {
        setIsTariffDrawerOpen(true);
    };

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
                                onMoreClick={handleMoreClick}
                            />
                            <TariffCard
                                title={`${proTariff?.name.toUpperCase()} tariff`}
                                isActive={false}
                                imageSrc={proTariffImg}
                                disabledImageSrc={disabledProTariffImg}
                                onMoreClick={handleMoreClick}
                            />
                            <TariffDrawer
                                onClose={() => setIsTariffDrawerOpen(false)}
                                tariff={proTariff}
                                open={isTariffDrawerOpen}
                            />
                        </div>
                    </div>
                    <div className={styles.switch_block}>
                        <SwitchItem
                            text='Открыт для совместных тренировок'
                            tooltipText={
                                <span>
                                    включеная функция позволит участвовать в&nbsp;совместных
                                    тренировках
                                </span>
                            }
                            tooltipWidth={205}
                        />
                        <SwitchItem
                            text='Уведомления'
                            tooltipText='включеная функция позволит получать уведомления об активностях'
                            tooltipWidth={219}
                        />
                        <SwitchItem
                            text='Тёмная тема'
                            tooltipText='темная тема доступна для PRO tarif'
                            tooltipWidth={115}
                            disabled={true}
                        />
                    </div>
                    <div className={styles.feedback_buttons_block}>
                        <Button type='primary' size='large'>
                            Написать отзыв
                        </Button>
                        <Button type='link' size='large'>
                            Смотреть все отзывы
                        </Button>
                    </div>
                </div>
            </Content>
        </div>
    );
};
