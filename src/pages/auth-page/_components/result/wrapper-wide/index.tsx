import styles from './wrapper-wide.module.scss';

type WrapperWideProps = {
    children: React.ReactNode;
    className?: string;
};

export const WrapperWide = ({ children, className }: WrapperWideProps) => (
    <div className={`${styles.wrapper} ${className}`}>{children}</div>
);
