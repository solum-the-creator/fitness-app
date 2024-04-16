import React from 'react';
import { NUMBER_TO_WEEKDAY } from '@constants/constants';
import { COLORS } from '@constants/styles';
import { Badge } from 'antd';
import moment from 'moment';

import styles from './workload-item.module.scss';

type WorkloadItemProps = {
    date: string;
    workload: number;
};

export const WorkloadItem = ({ date, workload }: WorkloadItemProps) => {
    const withWorkload = workload > 0;

    const weekDay = moment(date).isoWeekday();
    const weekDayName = NUMBER_TO_WEEKDAY[weekDay];

    const badgeColor = withWorkload ? COLORS.primaryLightColor6 : COLORS.primaryLightColor1;
    const badgeStyles = {
        color: withWorkload ? COLORS.primaryLightColor1 : COLORS.primaryLightColor6,
    };

    const workloadText = withWorkload ? `${workload} кг` : '';

    return (
        <React.Fragment>
            <Badge
                count={weekDay}
                color={badgeColor}
                style={badgeStyles}
                size='small'
                className={styles.badge}
            />
            <p className={styles.day}>{weekDayName}</p>
            <p className={styles.workload}>{workloadText}</p>
        </React.Fragment>
    );
};
