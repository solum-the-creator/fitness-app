import { DownOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';

import styles from './training-type-cell.module.scss';

type TrainingTypeCellProps = {
    type: string;
    name: string;
};

export const TrainingTypeCell = ({ type, name }: TrainingTypeCellProps) => {
    console.log(type);

    return (
        <div className={styles.wrapper}>
            <TrainingTypeBadge type={type} className={styles.badge} />
            <div className={styles.name_block}>
                <div>{name}</div>
                <DownOutlined style={{ fontSize: 10 }} />
            </div>
        </div>
    );
};
