import { ColumnData, splitIntoWeeks } from '@utils/trainings';

import { WeekItem } from './week-item';

import styles from './average-dayly-workload.module.scss';

type AverageDaylyWorkloadProps = {
    data: ColumnData[];
};

export const AverageDaylyWorkload = ({ data }: AverageDaylyWorkloadProps) => {
    const splitedData = splitIntoWeeks(data);

    return (
        <div className={styles.container}>
            {splitedData.map((item) => (
                <WeekItem key={item[0].date} data={item} />
            ))}
        </div>
    );
};
