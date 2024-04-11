import cn from 'classnames';

import styles from './badge.module.scss';

type BadgeProps = {
    count?: number;
    children?: React.ReactNode;
};

export const Badge = ({ count, children }: BadgeProps) => {
    const isHide = !count;

    const badgeClassNames = cn({
        [styles.badge]: children,
        [styles.badge_row]: !children,
    });

    return (
        <div className={styles.container}>
            <div>{children}</div>
            {isHide ? null : <span className={badgeClassNames}>{count}</span>}
        </div>
    );
};
