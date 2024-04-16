import React from 'react';
import { NUMBER_TO_WEEKDAY } from '@constants/constants';
import { COLORS } from '@constants/styles';
import { Badge } from 'antd';
import moment from 'moment';

import styles from './exercise-item.module.scss';

type ExerciseItemProps = {
    date: string;
    name?: string;
};

export const ExerciseItem = ({ date, name }: ExerciseItemProps) => {
    const weekDay = moment(date).isoWeekday();
    const weekDayName = NUMBER_TO_WEEKDAY[weekDay];

    return (
        <React.Fragment>
            <Badge
                count={weekDay}
                color={COLORS.characterLightError}
                size='small'
                className={styles.badge}
            />
            <p className={styles.day}>{weekDayName}</p>
            <p className={styles.name}>{name}</p>
        </React.Fragment>
    );
};
