import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { COLORS } from '@constants/styles';

import styles from './tariff-comparison.module.scss';

type TariffComparisonProps = {
    active?: boolean;
};

export const TariffComparison = ({ active }: TariffComparisonProps) => (
    <div className={styles.tariff_comparison_block}>
        <div className={styles.header}>
            <div className={`${styles.tag} ${styles.gray}`}>FREE</div>
            <div className={`${styles.tag} ${styles.blue}`}>
                <span className={active ? styles.active : undefined}>
                    PRO {active && <CheckCircleOutlined className={styles.tag_icon} />}
                </span>
            </div>
        </div>
        <div className={styles.content}>
            <div className={`${styles.content_col} ${styles.first}`}>
                <div className={styles.text}>Статистика за месяц</div>
                <div className={styles.text}>Статистика за всё время</div>
                <div className={styles.text}>Совместные тренировки</div>
                <div className={styles.text}>Участие в марафонах</div>
                <div className={styles.text}>Приложение iOS</div>
                <div className={styles.text}>Приложение Android</div>
                <div className={styles.text}>Индивидуальный Chat GPT</div>
            </div>
            <div className={styles.content_col}>
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CloseCircleOutlined
                    style={{ fontSize: '18px', color: COLORS.characterLightDisable }}
                />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CloseCircleOutlined
                    style={{ fontSize: '18px', color: COLORS.characterLightDisable }}
                />
                <CloseCircleOutlined
                    style={{ fontSize: '18px', color: COLORS.characterLightDisable }}
                />
                <CloseCircleOutlined
                    style={{ fontSize: '18px', color: COLORS.characterLightDisable }}
                />
                <CloseCircleOutlined
                    style={{ fontSize: '18px', color: COLORS.characterLightDisable }}
                />
            </div>
            <div className={styles.content_col}>
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
            </div>
        </div>
    </div>
);
