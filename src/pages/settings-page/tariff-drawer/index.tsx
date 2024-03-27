import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CloseOutlined } from '@ant-design/icons';
import { Tariff, TariffList } from '@redux/api/types';
import { Button, Drawer, RadioChangeEvent } from 'antd';

import { TariffComparison } from './tariff-comparison';
import { TariffCost } from './tariff-cost';

import styles from './tariff-drawer.module.scss';

type TariffDrawerProps = {
    tariff?: TariffList[number] | undefined;
    currentTariff?: Tariff;
    open: boolean;
    onClose: () => void;
};

export const TariffDrawer = ({ tariff, currentTariff, open, onClose }: TariffDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const [costValue, setCostValue] = useState<number | undefined>(undefined);

    const onChange = (e: RadioChangeEvent) => {
        setCostValue(e.target.value);
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
                            Ваш PRO tarif активен до {currentTariff.expired}
                        </div>
                    </div>
                )}

                <div className={styles.drawer_body}>
                    <TariffComparison />
                    <TariffCost tariff={tariff} value={costValue} onChange={onChange} />
                </div>
                <div className={styles.drawer_footer}>
                    <Button block={true} type='primary' size='large' disabled={!costValue}>
                        Выбрать и оплатить
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
