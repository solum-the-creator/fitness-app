import { DATE_FORMAT, PERIOD_OPTIONS, RU_CALENDAR_LOCALE } from '@constants/constants';
import { TrainingList } from '@redux/api/types';
import { Checkbox, DatePicker, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment, { Moment } from 'moment';

import styles from './training-info.module.scss';

type TrainingInfoProps = {
    trainingList: TrainingList;
    trainingDates: Moment[];
    changeTrainingName: (name?: string) => void;
    changeTrainingDate: (date?: string) => void;
    changeWithPeriod: (value: boolean) => void;
    changeTrainingPeriod: (period?: number) => void;
    trainingName?: string;
    trainingDate?: string;
    withPeriod?: boolean;
    period?: number;
    isEditable?: boolean;
};

type OptionType = {
    label: string;
    value: string;
};
export const TrainingInfo = ({
    trainingList,
    trainingDates,
    trainingName,
    trainingDate,
    withPeriod,
    period,
    changeTrainingName,
    changeTrainingDate,
    changeWithPeriod,
    changeTrainingPeriod,
    isEditable,
}: TrainingInfoProps) => {
    const trainingsOptions: OptionType[] = trainingList.map((training) => ({
        label: training.name,
        value: training.key,
    }));

    const selectedTrainingType = trainingList.find((item) => item.name === trainingName);
    const selectedTrainingDate = trainingDate ? moment(trainingDate) : null;

    const disabledDate: RangePickerProps['disabledDate'] = (current) =>
        current && current < moment().endOf('day');

    const datesWithTraining = (current: Moment) => {
        const withTrainingClass = 'ant-picker-cell-with-training';

        const isWithTraining = trainingDates.some((date) => current.isSame(date, 'date'));

        return (
            <div className={`ant-picker-cell-inner ${isWithTraining ? withTrainingClass : ''}`}>
                {current.date()}
            </div>
        );
    };
    const handleChangeTypeSelect = (value: string) => {
        const training = trainingList.find((item) => item.key === value);

        changeTrainingName(training?.name);
    };

    const handleChangeDate = (date: Moment | null) => {
        changeTrainingDate(date?.toISOString());
    };

    const handleChangeWithPeriod = (e: CheckboxChangeEvent) => {
        changeWithPeriod(e.target.checked);
        if (e.target.checked) {
            changeTrainingPeriod(PERIOD_OPTIONS[0].value);
        } else {
            changeTrainingPeriod(undefined);
        }
    };

    const handleChangePeriod = (value: number) => {
        changeTrainingPeriod(value);
    };

    return (
        <div className={styles.training_info}>
            <div className={styles.select_training}>
                <Select
                    style={{ width: '100%' }}
                    size='small'
                    placeholder='Выбор типа тренировки'
                    popupClassName={styles.select_popup}
                    value={selectedTrainingType?.key}
                    onChange={handleChangeTypeSelect}
                    options={trainingsOptions}
                    disabled={isEditable}
                    data-test-id='modal-create-exercise-select'
                />
            </div>
            <div className={styles.date_training}>
                <div className={styles.date_row}>
                    <DatePicker
                        placeholder='Выбор даты'
                        className={styles.form_input}
                        locale={RU_CALENDAR_LOCALE}
                        format={DATE_FORMAT}
                        disabledDate={disabledDate}
                        dateRender={datesWithTraining}
                        value={selectedTrainingDate}
                        onChange={handleChangeDate}
                        data-test-id='modal-drawer-right-date-picker'
                    />
                    <Checkbox
                        checked={withPeriod}
                        onChange={handleChangeWithPeriod}
                        className={styles.checkbox}
                        data-test-id='modal-drawer-right-checkbox-period'
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
                                value={period}
                                onChange={handleChangePeriod}
                                data-test-id='modal-drawer-right-select-period'
                            />
                        </div>
                        <div className={styles.select_training} />
                    </div>
                )}
            </div>
        </div>
    );
};
