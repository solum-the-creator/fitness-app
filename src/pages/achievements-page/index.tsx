import { BaseHeader } from '@components/header/base-header';
import { ErrorTrainingList } from '@components/modals/error-training-list';
import PATHS from '@constants/paths';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/api/api-slice';
import { Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { TabItem } from 'src/types/tabs';

import { AchievementsPerMonth } from './achievements-per-month';
import { AchievementsPerWeek } from './achievements-per-week';

import styles from './achievements-page.module.scss';

export const AchievementsPage = () => {
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
            label: 'За неделю',
            key: '1',
            children: <AchievementsPerWeek trainings={trainings} trainingList={trainingList} />,
        },
        {
            label: 'За месяц',
            key: '2',
            children: <AchievementsPerMonth trainings={trainings} trainingList={trainingList} />,
        },
        { label: 'За всё время (PRO)', key: '3', disabled: true },
    ];

    return (
        <div className={styles.main_container}>
            <div className={styles.header_wrapper}>
                <BaseHeader
                    breadCrumbs={[
                        { title: 'Главная', link: PATHS.MAIN },
                        { title: 'Достижения', link: PATHS.ACHIEVEMENTS },
                    ]}
                />
            </div>
            <div className={styles.content_wrapper}>
                <Content className={styles.content}>
                    <Tabs items={tabsItems} className={styles.tabs} />
                </Content>
            </div>
            <ErrorTrainingList isError={isError} refetch={refetch} />
        </div>
    );
};
