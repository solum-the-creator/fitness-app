import { COLORS } from '@constants/styles';
import { Badge } from 'antd';
import cn from 'classnames';

import styles from './training-type.module.scss';

type TrainingTypeProps = {
    type: string;
    text?: React.ReactNode;
    size?: 'small' | 'default';
    color?: string;
    disabled?: boolean;
    space?: number;
    className?: string;
};

const trainingColors: Record<TrainingTypeProps['type'], string> = {
    legs: '#ff4d4f',
    strength: '#fadb14',
    hands: '#13c2c2',
    chest: '#52c41a',
    back: '#fa8c16',
    default: '#d9d9d9',
};

export const TrainingTypeBadge = ({
    type,
    text,
    size,
    color,
    disabled,
    space,
    className,
}: TrainingTypeProps) => {
    const sizeClass = size === 'small' ? styles.small : styles.default;
    const badgeColor = disabled ? COLORS.characterLightDisable : color;

    return (
        <Badge
            color={trainingColors[type] || trainingColors.default}
            text={
                text ? (
                    <span style={{ marginLeft: space ? `${space}px` : undefined }}>{text}</span>
                ) : undefined
            }
            className={cn(styles.badge, className, sizeClass)}
            style={{ color: badgeColor || COLORS.primaryTextColor }}
        />
    );
};
