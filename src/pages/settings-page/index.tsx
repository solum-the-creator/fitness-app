/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useGetTariffListQuery, useUpdateUserMutation } from '@redux/api/api-slice';
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
    const [updateUser] = useUpdateUserMutation();

    const { data: tariffList } = useGetTariffListQuery();
    const proTariff = tariffList && tariffList[0];
    const currentTariff = user.tariff?.tariffId === proTariff?._id ? user.tariff : undefined;

    const [isTariffDrawerOpen, setIsTariffDrawerOpen] = useState(false);
    const [isLoadingReadyForJointTraining, setIsLoadingReadyForJointTraining] = useState(false);
    const [isLoadingSendNotification, setIsLoadingSendNotification] = useState(false);

    const handleMoreClick = () => {
        setIsTariffDrawerOpen(true);
    };

    const onChangeReadyForJointTraining = async (checked: boolean) => {
        try {
            setIsLoadingReadyForJointTraining(true);
            await updateUser({ readyForJointTraining: checked }).unwrap();

            setIsLoadingReadyForJointTraining(false);
        } catch {
            setIsLoadingReadyForJointTraining(false);
        }
    };

    const onChangeSendNotification = async (checked: boolean) => {
        try {
            setIsLoadingSendNotification(true);
            await updateUser({ sendNotification: checked }).unwrap();

            setIsLoadingSendNotification(false);
        } catch {
            setIsLoadingSendNotification(false);
        }
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
                                testId='pro-tariff-card'
                            />
                            <TariffDrawer
                                onClose={() => setIsTariffDrawerOpen(false)}
                                tariff={proTariff}
                                currentTariff={currentTariff}
                                open={isTariffDrawerOpen}
                            />
                        </div>
                    </div>
                    <div className={styles.switch_block}>
                        <SwitchItem
                            checked={user.readyForJointTraining}
                            onChange={onChangeReadyForJointTraining}
                            loading={isLoadingReadyForJointTraining}
                            text='Открыт для совместных тренировок'
                            tooltipText={
                                <span>
                                    включеная функция позволит участвовать в&nbsp;совместных
                                    тренировках
                                </span>
                            }
                            tooltipWidth={205}
                            testId='tariff-trainings'
                            tooltipTestId='tariff-theme-icon'
                        />
                        <SwitchItem
                            checked={user.sendNotification}
                            onChange={onChangeSendNotification}
                            loading={isLoadingSendNotification}
                            text='Уведомления'
                            tooltipText='включеная функция позволит получать уведомления об активностях'
                            tooltipWidth={219}
                            testId='tariff-notifications'
                            tooltipTestId='tariff-notifications-icon'
                        />
                        <SwitchItem
                            text='Тёмная тема'
                            tooltipText='темная тема доступна для PRO tarif'
                            tooltipWidth={115}
                            disabled={!currentTariff}
                            testId='tariff-theme'
                            tooltipTestId='tariff-theme-icon'
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
