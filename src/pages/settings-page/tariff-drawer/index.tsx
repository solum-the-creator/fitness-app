import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CloseOutlined } from '@ant-design/icons';
import { DATE_SHORT_FORMAT } from '@constants/constants';
import { useAddTariffMutation } from '@redux/api/api-slice';
import { Tariff, TariffList } from '@redux/api/types';
import { Button, Drawer, RadioChangeEvent } from 'antd';
import moment from 'moment';

import { TariffComparison } from './tariff-comparison';
import { TariffCost } from './tariff-cost';

import styles from './tariff-drawer.module.scss';

type TariffDrawerProps = {
    open: boolean;
    openConfirmModal: () => void;
    onClose: () => void;
    tariff?: TariffList[number] | undefined;
    currentTariff?: Tariff;
};

export const TariffDrawer = ({
    tariff,
    currentTariff,
    open,
    openConfirmModal,
    onClose,
}: TariffDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const [addTariff] = useAddTariffMutation();

    const [periodValue, setPeriodValue] = useState<number | undefined>(undefined);

    const formattedDate =
        currentTariff?.expired && moment(currentTariff.expired).format(DATE_SHORT_FORMAT);

    const onChange = (e: RadioChangeEvent) => {
        setPeriodValue(e.target.value);
    };

    const onPickTariff = async () => {
        if (tariff?._id && periodValue) {
            await addTariff({ tariffId: tariff._id, days: periodValue });
            onClose();
            openConfirmModal();
        }
    };

    return (
        <Drawer
            placement={matches ? 'bottom' : 'right'}
            width={matches ? '100%' : 408}
            height={matches ? 555 : '100%'}
            closable={false}
            open={open}
            className={`${styles.drawer} ${drawerClass}`}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={onClose}
            destroyOnClose={true}
            data-test-id='tariff-sider'
        >
            <div className={styles.drawer_wrapper}>
                <div className={styles.drawer_header}>
                    <h4 className={styles.drawer_title}>Сравнить тарифы</h4>
                    <Button
                        type='text'
                        icon={<CloseOutlined style={{ fontSize: '14px' }} />}
                        className={styles.button_close}
                        onClick={onClose}
                    />
                </div>
                {currentTariff && (
                    <div className={styles.drawer_active_date}>
                        <div className={styles.drawer_active_date_text}>
                            Ваш PRO tarif активен до {formattedDate}
                        </div>
                    </div>
                )}

                <div className={styles.drawer_body}>
                    <TariffComparison active={!!currentTariff} />
                    {!currentTariff && (
                        <TariffCost tariff={tariff} value={periodValue} onChange={onChange} />
                    )}
                </div>
                {!currentTariff && (
                    <div className={styles.drawer_footer}>
                        <Button
                            block={true}
                            type='primary'
                            size='large'
                            disabled={!periodValue}
                            onClick={onPickTariff}
                            data-test-id='tariff-submit'
                        >
                            Выбрать и оплатить
                        </Button>
                    </div>
                )}
            </div>
        </Drawer>
    );
};
