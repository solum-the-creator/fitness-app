import { useState } from 'react';
import { push } from 'redux-first-history';
import PATHS from '@constants/paths';
import { FeedbackModal } from '@pages/feedbacks-page/feedback-modal';
import { useGetTariffListQuery, useUpdateUserMutation } from '@redux/api/api-slice';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { setUser, userSelector } from '@redux/user/user-slice';
import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { ConfirmModal } from './confirm-modal';
import { Header } from './header';
import { SwitchItem } from './switch-item';
import { TariffCard } from './tariff-card';
import { TariffDrawer } from './tariff-drawer';

import styles from './settings-page.module.scss';

import freeTariffImg from '/free_tariff.jpg';
import proTariffImg from '/pro_able_tariff.jpg';
import disabledProTariffImg from '/pro_disable_tariff.jpg';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);
    const [updateUser] = useUpdateUserMutation();

    const { data: tariffList } = useGetTariffListQuery();
    const proTariff = tariffList && tariffList[0];
    const currentTariff = user.tariff?.tariffId === proTariff?._id ? user.tariff : undefined;

    const [isTariffDrawerOpen, setIsTariffDrawerOpen] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState(false);

    const handleMoreClick = () => {
        setIsTariffDrawerOpen(true);
    };

    const onChangeReadyForJointTraining = async (checked: boolean) => {
        try {
            dispatch(setUser({ ...user, readyForJointTraining: checked }));
            await updateUser({ readyForJointTraining: checked }).unwrap();
        } catch {
            dispatch(setUser({ ...user, readyForJointTraining: !checked }));
        }
    };

    const onChangeSendNotification = async (checked: boolean) => {
        try {
            dispatch(setUser({ ...user, sendNotification: checked }));
            await updateUser({ sendNotification: checked }).unwrap();
        } catch {
            dispatch(setUser({ ...user, readyForJointTraining: checked }));
        }
    };

    const showFeedbackModal = () => {
        setIsOpenFeedbackModal(true);
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
                                isActive={!!currentTariff}
                                activeDate={currentTariff?.expired}
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
                                openConfirmModal={() => setIsConfirmModalVisible(true)}
                            />
                            <ConfirmModal isModalOpen={isConfirmModalVisible} />
                        </div>
                    </div>
                    <div className={styles.switch_block}>
                        <SwitchItem
                            checked={user.readyForJointTraining}
                            onChange={onChangeReadyForJointTraining}
                            text='Открыт для совместных тренировок'
                            tooltipText={
                                <span>
                                    включеная функция позволит участвовать в&nbsp;совместных
                                    тренировках
                                </span>
                            }
                            tooltipWidth={205}
                            testId='tariff-trainings'
                            tooltipTestId='tariff-trainings-icon'
                        />
                        <SwitchItem
                            checked={user.sendNotification}
                            onChange={onChangeSendNotification}
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
                        <Button type='primary' size='large' onClick={showFeedbackModal}>
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            size='large'
                            onClick={() => dispatch(push(PATHS.FEEDBACKS))}
                        >
                            Смотреть все отзывы
                        </Button>
                        <FeedbackModal
                            onShow={showFeedbackModal}
                            onClose={() => setIsOpenFeedbackModal(false)}
                            isModalOpen={isOpenFeedbackModal}
                        />
                    </div>
                </div>
            </Content>
        </div>
    );
};
