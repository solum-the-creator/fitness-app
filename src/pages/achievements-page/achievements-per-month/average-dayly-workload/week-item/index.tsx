import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { WorkloadItem } from '@components/workload-item';
import { DATE_SHORT_FORMAT } from '@constants/constants';
import { sortByWeekDay } from '@utils/sorting';
import { ColumnData } from '@utils/trainings';
import { Button } from 'antd';
import moment from 'moment';

import styles from './week-item.module.scss';

type WeekItemProps = {
    data: ColumnData[];
};

export const WeekItem = ({ data }: WeekItemProps) => {
    const matches = useMediaQuery({ query: '(max-width: 1040px)' });
    const [isCollapsed, setIsCollapsed] = useState(matches);

    useEffect(() => {
        setIsCollapsed(matches);
    }, [matches]);

    const sortedData = sortByWeekDay([...data]);

    const weekDates = `Неделя ${moment(data[0].date).format(DATE_SHORT_FORMAT)}-${moment(
        data[data.length - 1].date,
    ).format(DATE_SHORT_FORMAT)}`;

    return (
        <div className={styles.container}>
            {matches ? (
                <Button
                    size='small'
                    type='text'
                    className={styles.button_collapse}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <span className={styles.title}>{weekDates}</span>
                    {isCollapsed ? (
                        <DownOutlined className={styles.icon} style={{ fontSize: 16 }} />
                    ) : (
                        <UpOutlined className={styles.icon} style={{ fontSize: 16 }} />
                    )}
                </Button>
            ) : (
                <span className={styles.title}>{weekDates}</span>
            )}

            {(!matches || !isCollapsed) && (
                <div className={styles.workload_list}>
                    {sortedData.map((item) => (
                        <WorkloadItem
                            key={item.date}
                            date={item.date}
                            workload={item.value}
                            dateToWeekDay={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
