import { sortByWeekDay } from '@utils/sorting';

import { ColumnData } from '../column-per-week';

import { WorkloadItem } from './workload-item';

import styles from './average-workload-block.module.scss';

type AverageWorkloadBlockProps = {
    data: ColumnData[];
};
export const AverageWorkloadBlock = ({ data }: AverageWorkloadBlockProps) => {
    const sortedData = sortByWeekDay([...data]);

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Средняя нагрузка
                <br />
                по дням недели
            </p>
            <div className={styles.workload_list}>
                {sortedData.map((item) => (
                    <WorkloadItem key={item.date} date={item.date} workload={item.value} />
                ))}
            </div>
        </div>
    );
};
