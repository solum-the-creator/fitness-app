import styles from './wrapper-wide.module.scss';

export const WrapperWide = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
