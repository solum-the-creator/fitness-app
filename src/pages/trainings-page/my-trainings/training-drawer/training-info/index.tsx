import { useState } from 'react';
import { DATE_FORMAT, PERIOD_OPTIONS, RU_CALENDAR_LOCALE } from '@constants/constants';
import { TrainingList } from '@redux/api/types';
import { Checkbox, DatePicker, Select } from 'antd';

import styles from './training-info.module.scss';

type TrainingInfoProps = {
    trainingList: TrainingList;
};

type OptionType = {
    label: string;
    value: string;
};
export const TrainingInfo = ({ trainingList }: TrainingInfoProps) => {
    const [withPeriod, setWithPeriod] = useState(false);

    const trainingsOptions: OptionType[] = trainingList.map((training) => ({
        label: training.name,
        value: training.key,
    }));

    return (
        <div className={styles.training_info}>
            <div className={styles.select_training}>
                <Select
                    style={{ width: '100%' }}
                    size='small'
                    placeholder='Выбор типа тренировки'
                    popupClassName={styles.select_popup}
                    // value={selectedTrainingType?.key}
                    // onChange={handleChangeSelect}
                    options={trainingsOptions}
                />
            </div>
            <div className={styles.date_training}>
                <div className={styles.date_row}>
                    <DatePicker
                        placeholder='Выбор даты'
                        className={styles.form_input}
                        locale={RU_CALENDAR_LOCALE}
                        format={DATE_FORMAT}
                    />
                    <Checkbox
                        checked={withPeriod}
                        onChange={() => setWithPeriod(!withPeriod)}
                        className={styles.checkbox}
                    >
                        С&nbsp;периодичностью
                    </Checkbox>
                </div>
                {withPeriod && (
                    <div className={styles.date_row}>
                        <div className={styles.select_training}>
                            <Select
                                style={{ width: '100%' }}
                                size='small'
                                placeholder='Выбор периода'
                                popupClassName={styles.select_popup}
                                className={styles.select_training}
                                options={PERIOD_OPTIONS}
                            />
                        </div>
                        <div className={styles.select_training}>
                            {/* <Select
                            style={{ width: '100%' }}
                            size='small'
                            placeholder='День недели'
                            popupClassName={styles.select_popup}
                            options={DAY_OF_WEEK_OPTIONS}
                        /> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
