import { Badge } from 'antd';
import styles from './training-type.module.scss';

type TrainingTypeProps = {
    type: 'legs' | 'strength' | 'hands' | 'chest' | 'back' | 'default';
    text?: string;
};

const trainingColors: Record<TrainingTypeProps['type'], string> = {
    legs: '#ff4d4f',
    strength: '#fadb14',
    hands: '#13c2c2',
    chest: '#52c41a',
    back: '#fa8c16',
    default: '#d9d9d9',
};

export const TrainingTypeBadge = ({ type, text }: TrainingTypeProps) => (
    <Badge color={trainingColors[type]} text={text} className={styles.badge} />
);
