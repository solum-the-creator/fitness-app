import { ErrorTrainingList } from '@components/modals/error-training-list';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/api/api-slice';

import styles from './trainings-page.module.scss';

export const TrainingsPage = () => {
    const { data: trainings, isFetching } = useGetTrainingQuery();

    const {
        data: trainingList = [],
        isFetching: isFetchingTrainingList,
        isError,
        refetch,
    } = useGetTrainingListQuery();

    useLoaderLoading(isFetching || isFetchingTrainingList);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Тренировки</h1>
            <ErrorTrainingList isError={isError} refetch={refetch} />
        </div>
    );
};
