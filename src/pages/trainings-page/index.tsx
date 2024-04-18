import { Badge } from '@components/badge';
import { BaseHeader } from '@components/header/base-header';
import { ErrorOpenDataModal } from '@components/modals/error-open-data-modal';
import PATHS from '@constants/paths';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/api/api-slice';
import { useAppSelector } from '@redux/configure-store';
import { findMostDemandingTrainingType } from '@utils/exercise';
import { Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import cn from 'classnames';
import moment from 'moment';
import { TabItem } from 'src/types/tabs';

import { JointTrainings } from './joint-trainings';
import { Marathon } from './marathon';
import { MyTrainings } from './my-trainings';

import styles from './trainings-page.module.scss';

export const TrainingsPage = () => {
    const { data: trainings = [], isFetching } = useGetTrainingQuery();
    const inviteCount = useAppSelector((state) => state.invite);

    const {
        data: trainingList = [],
        isFetching: isFetchingTrainingList,
        isError,
        refetch,
    } = useGetTrainingListQuery();

    useLoaderLoading(isFetching || isFetchingTrainingList);

    const trainingDates = trainings.map((training) => moment(training.date));
    const mostDemandingTrainingType = findMostDemandingTrainingType(trainings, trainingList);

    const tabsItems: TabItem[] = [
        {
            label: 'Мои тренировки',
            key: '1',
            children: <MyTrainings trainings={trainings} trainingList={trainingList} />,
        },
        {
            label: (
                <div className={styles.label_badge}>
                    <span>Совместные тренировки</span>
                    <span>
                        <Badge count={inviteCount} />
                    </span>
                </div>
            ),
            key: '2',
            children: (
                <JointTrainings
                    trainingType={mostDemandingTrainingType}
                    trainingDates={trainingDates}
                    trainingList={trainingList}
                />
            ),
        },
        { label: 'Марафоны', key: '3', children: <Marathon /> },
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
                <Content className={cn(styles.content, 'trainings_content')}>
                    <Tabs items={tabsItems} className={styles.tabs} destroyInactiveTabPane={true} />
                </Content>
            </div>
            <ErrorOpenDataModal isError={isError} refetch={refetch} />
        </div>
    );
};
