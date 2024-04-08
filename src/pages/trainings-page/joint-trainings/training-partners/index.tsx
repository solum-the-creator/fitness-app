import { useGetTrainingPalsQuery } from '@redux/api/api-slice';

import { PartnerCard } from './partner-card';

import styles from './training-partners.module.scss';

export const TrainingPartners = () => {
    const { data: trainingPals = [] } = useGetTrainingPalsQuery();

    const isEmpty = trainingPals.length === 0;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Мои партнёры по тренировкам</h4>
            {isEmpty ? (
                <p className={styles.description}>
                    У вас пока нет партнёров для совместных тренировок
                </p>
            ) : (
                <div className={styles.partners_list}>
                    {trainingPals.map((trainingPal) => (
                        <PartnerCard key={trainingPal.id} {...trainingPal} />
                    ))}
                </div>
            )}
        </div>
    );
};
