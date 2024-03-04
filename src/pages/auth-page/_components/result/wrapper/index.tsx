import styles from './wrapper.module.scss';

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.wrapper}>{children}</div>
);
