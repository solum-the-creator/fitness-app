import { Button } from 'antd';

import styles from './empty-trainings.module.scss';

type EmptyTrainingsProps = {
    onCreate: () => void;
};

export const EmptyTrainings = ({ onCreate }: EmptyTrainingsProps) => (
    <div className={styles.empty_container}>
        <div className={styles.wrapper}>
            <div className={styles.empty_trainings}>
                <h3 className={styles.title}>У вас ещё нет созданных тренировок</h3>
            </div>
        </div>
        <Button type='primary' size='large' className={styles.button} onClick={onCreate}>
            Создать тренировку
        </Button>
    </div>
);
