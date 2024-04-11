import styles from './marathon.module.scss';

export const Marathon = () => (
    <div className={styles.container}>
        <h3 className={styles.title}>
            В данный период
            <br />
            ни один марафон не проводится
        </h3>
        <p className={styles.description}>
            Заглядывайте сюда почаще
            <br />и ваш первый марафон скоро начнётся.
        </p>
    </div>
);
