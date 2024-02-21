import styles from './wrapper-wide.module.scss';

interface WrapperWideProps {
    children: React.ReactNode;
    className?: string;
}

export const WrapperWide = ({ children, className }: WrapperWideProps) => {
    return <div className={`${styles.wrapper} ${className}`}>{children}</div>;
};
