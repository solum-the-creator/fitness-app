import cn from 'classnames';

import styles from './wrapper-wide.module.scss';

type WrapperWideProps = {
    children: React.ReactNode;
    className?: string;
};

export const WrapperWide = ({ children, className }: WrapperWideProps) => (
    <div className={cn(styles.wrapper, className)}>{children}</div>
);
