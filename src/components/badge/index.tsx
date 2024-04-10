import styles from './badge.module.scss';

type BadgeProps = {
    count?: number;
    children?: React.ReactNode;
};

export const Badge = ({ count, children }: BadgeProps) => {
    const isHide = count === 0 || !count;

    const badgeClass = children ? styles.badge : styles.badge_row;

    return (
        <div className={styles.container}>
            <div>{children}</div>
            {isHide ? null : <span className={badgeClass}>{count}</span>}
        </div>
    );
};
