import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import styles from './partner-card.module.scss';

type PartnerCardProps = {
    name: string;
    imageSrc: string | null;
    trainingType: string;
    avgWeightInWeek: number;
};

export const PartnerCard = ({
    name,
    avgWeightInWeek,
    imageSrc,
    trainingType,
}: PartnerCardProps) => (
    <div className={styles.partner_card}>
        <div className={styles.partner_info}>
            <Avatar
                src={imageSrc}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                size={42}
            />
            <p className={styles.partner_name}>{name}</p>
        </div>
        <div className={styles.training_info}>
            <div className={styles.label_row}>
                <span className={styles.info_label}>Тип тренировки:</span>
                <span className={styles.info_label}>Средняя нагрузка:</span>
            </div>
            <div className={styles.info_row}>
                <span className={styles.info_value}>{trainingType}</span>
                <span className={styles.info_value}>{avgWeightInWeek} кг/нед</span>
            </div>
        </div>
    </div>
);
