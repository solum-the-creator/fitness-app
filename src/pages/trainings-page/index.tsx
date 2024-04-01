import { BaseHeader } from '@components/header/base-header';
import { ErrorTrainingList } from '@components/modals/error-training-list';
import PATHS from '@constants/paths';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/api/api-slice';
import { Content } from 'antd/lib/layout/layout';

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
        <div className={styles.main_container}>
            <div className={styles.header_wrapper}>
                <BaseHeader
                    breadCrumbs={[
                        { title: 'Главная', link: PATHS.MAIN },
                        { title: 'Тренировки', link: PATHS.TRAININGS },
                    ]}
                />
            </div>
            <div className={styles.content_wrapper}>
                <Content className={styles.content}>Мои тренировки</Content>
            </div>
            <ErrorTrainingList isError={isError} refetch={refetch} />
        </div>
    );
};
