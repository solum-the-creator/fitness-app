import { ColumnData } from '@pages/achievements-page/achievements-per-week/column-per-week';
import { Training, TrainingList, TrainingResponse } from '@redux/api/types';

import {
    getAverageWorkload,
    getMostPopularExercise,
    getMostPopularExerciseForEachDay,
    getTotalApproaches,
    getTotalReplays,
    getTotalWorkload,
} from './exercise';

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

const getMostPopularTraining = (trainings: Training[]): string | null => {
    const trainingCounts: Array<{ name: string; count: number }> = [];

    trainings.forEach((training) => {
        const index = trainingCounts.findIndex((item) => item.name === training.name);

        if (index >= 0) {
            trainingCounts[index].count += 1;
        } else {
            trainingCounts.push({ name: training.name, count: 1 });
        }
    });

    return trainingCounts.sort((a, b) => b.count - a.count).length > 0
        ? trainingCounts[0].name
        : null;
};

export const getDataForWeek = (trainings: TrainingResponse[]) => {
    const lastWeekTrainings = getLastWeekTrainings(trainings);

    const selectedTrainings = [...lastWeekTrainings.flatMap((item) => item.trainings)];

    if (selectedTrainings.length === 0) {
        return {
            isEmpty: true,
            totalWorkload: 0,
            columnData: [],
            totalReplays: 0,
            totalApproaches: 0,
            mostPopularTraining: null,
            mostPopularExercise: null,
            mostPopularExerciseForEachDay: [],
            dailyWorkload: 0,
        };
    }

    const data = lastWeekTrainings.map((item) => {
        const averageWorkload = getAverageWorkload(item.trainings);

        return { date: item.date, averageWorkload };
    });

    const totalWorkload = getTotalWorkload(selectedTrainings);

    const dailyWorkload = Math.round((totalWorkload / 7) * 10) / 10;

    const totalReplays = getTotalReplays(selectedTrainings);
    const totalApproaches = getTotalApproaches(selectedTrainings);

    const mostPopularTraining = getMostPopularTraining(selectedTrainings);
    const mostPopularExercise = getMostPopularExercise(selectedTrainings);

    const mostPopularExerciseForEachDay = getMostPopularExerciseForEachDay(lastWeekTrainings);

    const columnData: ColumnData[] = data.map((item) => ({
        date: item.date.toISOString(),
        value: item.averageWorkload,
    }));

    return {
        isEmpty: false,
        totalWorkload,
        columnData,
        totalReplays,
        totalApproaches,
        mostPopularTraining,
        mostPopularExercise,
        mostPopularExerciseForEachDay,
        dailyWorkload,
    };
};
