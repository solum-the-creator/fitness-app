import { BaseHeader } from '@components/header/base-header';
import { ErrorTrainingList } from '@components/modals/error-training-list';
import PATHS from '@constants/paths';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/api/api-slice';
import { Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { JointTrainings } from './joint-trainings';
import { MyTrainings } from './my-trainings';

import styles from './trainings-page.module.scss';

type TabItem = {
    label: string;
    key: string;
    children: React.ReactNode;
};

export const TrainingsPage = () => {
    const { data: trainings = [], isFetching } = useGetTrainingQuery();

    const {
        data: trainingList = [],
        isFetching: isFetchingTrainingList,
        isError,
        refetch,
    } = useGetTrainingListQuery();

    useLoaderLoading(isFetching || isFetchingTrainingList);

    const tabsItems: TabItem[] = [
        {
            label: 'Мои тренировки',
            key: '1',
            children: <MyTrainings trainings={trainings} trainingList={trainingList} />,
        },
        { label: 'Совместные тренировки', key: '2', children: <JointTrainings /> },
        { label: 'Марафоны', key: '3', children: <div>Марафоны</div> },
    ];

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
                <Content className={styles.content}>
                    <Tabs items={tabsItems} />
                </Content>
            </div>
            <ErrorTrainingList isError={isError} refetch={refetch} />
        </div>
    );
};
