import { useMediaQuery } from 'react-responsive';
import { CloseOutlined } from '@ant-design/icons';
import { TariffList } from '@redux/api/types';
import { Button, Drawer, Radio } from 'antd';

import { TariffComparison } from './tariff-comparison';

import styles from './tariff-drawer.module.scss';

type TariffDrawerProps = {
    tariff: TariffList[number] | undefined;
    open: boolean;
    onClose: () => void;
};

export const TariffDrawer = ({ tariff, open, onClose }: TariffDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

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
                <div className={styles.drawer_active_date}>
                    <div className={styles.drawer_active_date_text}>
                        Ваш PRO tarif активен до 02.07
                    </div>
                </div>
                <div className={styles.drawer_body}>
                    <TariffComparison />
                    <div className={styles.tariff_cost_block}>
                        <h5 className={styles.tariff_cost_title}>Стоимость тарифа</h5>
                        <div className={styles.periods}>
                            <div className={`${styles.period_col} ${styles.period_col_first}`}>
                                {tariff &&
                                    tariff.periods.map((period) => (
                                        <div key={period.days} className={styles.period_text}>
                                            {period.text}
                                        </div>
                                    ))}
                            </div>
                            <div className={styles.period_col}>
                                {tariff &&
                                    tariff.periods.map((period) => (
                                        <div key={period.days} className={styles.period_cost}>
                                            {new Intl.NumberFormat('ru-RU', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(period.cost)}
                                        </div>
                                    ))}
                            </div>
                            <Radio.Group>
                                <div className={styles.period_col}>
                                    {tariff &&
                                        tariff.periods.map((period) => (
                                            <Radio
                                                key={period.days}
                                                value={period.days}
                                                className={styles.period_radio}
                                            />
                                        ))}
                                </div>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
                <div className={styles.drawer_footer}>
                    <Button block={true} type='primary' size='large'>
                        Выбрать и оплатить
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
