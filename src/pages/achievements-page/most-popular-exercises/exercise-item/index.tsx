import React from 'react';
import { NUMBER_TO_WEEKDAY } from '@constants/constants';
import { COLORS } from '@constants/styles';
import { Badge } from 'antd';

import styles from './exercise-item.module.scss';

type ExerciseItemProps = {
    dayOfWeek: number;
    name: string | null;
};

export const ExerciseItem = ({ dayOfWeek, name }: ExerciseItemProps) => {
    const isoWeekDay = dayOfWeek + 1;
    const weekDayName = NUMBER_TO_WEEKDAY[isoWeekDay];

    return (
        <React.Fragment>
            <Badge
                count={isoWeekDay}
                color={COLORS.characterLightError}
                size='small'
                className={styles.badge}
            />
            <p className={styles.day}>{weekDayName}</p>
            <p className={styles.name}>{name}</p>
        </React.Fragment>
    );
};
