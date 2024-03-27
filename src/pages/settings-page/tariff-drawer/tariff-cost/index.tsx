import { TariffList } from '@redux/api/types';
import { Radio, RadioChangeEvent } from 'antd';

import styles from './tariff-cost.module.scss';

type TariffCostProps = {
    tariff?: TariffList[number];
    value?: number;
    onChange: (e: RadioChangeEvent) => void;
};

export const TariffCost = ({ tariff, value, onChange }: TariffCostProps) => {
    console.log(tariff);

    return (
        <div className={styles.tariff_cost_block} data-test-id='tariff-cost'>
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
                <Radio.Group onChange={onChange} value={value}>
                    <div className={styles.period_col}>
                        {tariff &&
                            tariff.periods.map((period) => (
                                <Radio
                                    key={period.days}
                                    value={period.days}
                                    className={styles.period_radio}
                                    data-test-id={period.cost === 10 ? 'tariff-10' : undefined}
                                />
                            ))}
                    </div>
                </Radio.Group>
            </div>
        </div>
    );
};
