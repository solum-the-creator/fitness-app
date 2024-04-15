import styles from './general-info.module.scss';

type GeneralInfoProps = {
    totalWorkload: number;
    dailyWorkload: number;
    totalRepeats: number;
    totalApproaches: number;
};

export const GeneralInfo = ({
    totalWorkload,
    dailyWorkload,
    totalRepeats,
    totalApproaches,
}: GeneralInfoProps) => (
    <div className={styles.general_info}>
        <div className={styles.general_info_item}>
            <span className={styles.value}>{totalWorkload}</span>
            <p className={styles.title}>Общая нагрузка,&nbsp;кг</p>
        </div>
        <div className={styles.general_info_item}>
            <span className={styles.value}>{dailyWorkload}</span>
            <p className={styles.title}>Нагрузка в&nbsp;день,&nbsp;кг</p>
        </div>
        <div className={styles.general_info_item}>
            <span className={styles.value}>{totalRepeats}</span>
            <p className={styles.title}>Количество повторени,&nbsp;раз</p>
        </div>
        <div className={styles.general_info_item}>
            <span className={styles.value}>{totalApproaches}</span>
            <p className={styles.title}>Подходы, раз</p>
        </div>
    </div>
);
