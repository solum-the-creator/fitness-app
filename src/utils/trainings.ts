import { ColumnData } from '@pages/achievements-page/achievements-per-week/column-per-week';
import { TrainingList, TrainingResponse } from '@redux/api/types';

import { getAverageWorkload } from './exercise';

export const missingTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList =>
    trainingList.filter((training) => !trainings.some((item) => item.name === training.name));

export const unimplementedTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList =>
    trainingList.filter(
        (training) =>
            !trainings.some((item) => item.name === training.name && item.isImplementation),
    );

export const availableTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList =>
    trainingList.filter((training) =>
        trainings.some((item) => item.name === training.name && !item.isImplementation),
    );

export const getLastWeekTrainings = (
    trainings: TrainingResponse[],
): Array<{ date: Date; trainings: TrainingResponse[] }> => {
    const today = new Date();
    const oneDayMs = 1000 * 60 * 60 * 24;

    const lastSevenDays = Array.from(
        { length: 7 },
        (_, index) => new Date(today.getTime() - (6 - index) * oneDayMs),
    );

    const lastWeekTrainings = lastSevenDays.map((date) => {
        const trainingsForDay = trainings.filter((training) => {
            const trainingDate = new Date(training.date);

            return trainingDate.toDateString() === date.toDateString();
        });

        return { date, trainings: trainingsForDay };
    });

    return lastWeekTrainings;
};

export const getDataForWeekColumn = (trainings: TrainingResponse[]) => {
    const lastWeekTrainings = getLastWeekTrainings(trainings);

    const data = lastWeekTrainings.map((item) => {
        const averageWorkload = getAverageWorkload(item.trainings);

        return { date: item.date, averageWorkload };
    });

    const columnData: ColumnData[] = data.map((item) => ({
        date: item.date.toISOString(),
        value: item.averageWorkload,
    }));

    return columnData;
};
