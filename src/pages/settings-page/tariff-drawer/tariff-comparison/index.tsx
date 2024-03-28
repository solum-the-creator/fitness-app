import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';

import styles from './tariff-comparison.module.scss';

export const TariffComparison = () => (
    <div className={styles.tariff_comparison_block}>
        <div className={styles.header}>
            <div className={`${styles.tag} ${styles.gray}`}>FREE</div>
            <div className={`${styles.tag} ${styles.blue}`}>
                <span>PRO</span>
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
                <CloseCircleOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />
                <CheckCircleFilled style={{ fontSize: '18px' }} />
                <CloseCircleOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />
                <CloseCircleOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />
                <CloseCircleOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />
                <CloseCircleOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />
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
