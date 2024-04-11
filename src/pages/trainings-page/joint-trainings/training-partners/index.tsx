import { useEffect } from 'react';
import { useGetTrainingPalsQuery } from '@redux/api/api-slice';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { setTrainingPartners } from '@redux/training-partners/training-partners-slice';

import { PartnerCard } from './partner-card';

import styles from './training-partners.module.scss';

export const TrainingPartners = () => {
    const trainingPals = useAppSelector((state) => state.trainingPartners);
    const dispatch = useAppDispatch();
    const { data: initialTrainingPals = [] } = useGetTrainingPalsQuery();

    useEffect(() => {
        if (initialTrainingPals.length === 0) return;
        dispatch(setTrainingPartners(initialTrainingPals));
    }, [dispatch, initialTrainingPals]);

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
                    {trainingPals.map((trainingPal, index) => (
                        <PartnerCard key={trainingPal.id} {...trainingPal} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};
