import { Badge } from 'antd';
import styles from './training-type.module.scss';

type TrainingTypeProps = {
    type: string;
    text?: string;
    size?: 'small' | 'default';
    color?: string;
    disabled?: boolean;
};

const trainingColors: Record<TrainingTypeProps['type'], string> = {
    legs: '#ff4d4f',
    strength: '#fadb14',
    hands: '#13c2c2',
    chest: '#52c41a',
    back: '#fa8c16',
    default: '#d9d9d9',
};

export const TrainingTypeBadge = ({ type, text, size, color, disabled }: TrainingTypeProps) => {
    const sizeClass = size === 'small' ? styles.small : styles.default;

    const badgeColor = disabled ? '#bfbfbf' : color;
    return (
        <Badge
            color={trainingColors[type] || trainingColors.default}
            text={text || type}
            className={`${styles.badge} ${sizeClass}`}
            style={{ color: badgeColor ? badgeColor : '#262626' }}
        />
    );
};
