import { Exercise, Training, TrainingList } from '@redux/api/types';
import { nanoid } from 'nanoid';

export type PopularExercise = {
    name: string;
    count: number;
};

export const createEmptyExercise = (): Partial<Exercise> => ({
    name: '',
    replays: undefined,
    approaches: undefined,
    weight: undefined,
    isImplementation: false,
    tempId: nanoid(),
});

export const filterExerciseList = (filteringExerciseList: Array<Partial<Exercise>>): Exercise[] => {
    const filteredList = filteringExerciseList
        .filter((item) => item.name?.trim() !== '')
        .map((item) => ({
            ...item,
            replays: item.replays === undefined ? 1 : item.replays,
            approaches: item.approaches === undefined ? 1 : item.approaches,
            weight: item.weight === undefined ? 0 : item.weight,
        }));

    return filteredList as Exercise[];
};

export const calculateWorkload = (exercise: Exercise): number =>
    exercise.replays * exercise.weight * exercise.approaches;

export const getTotalWorkload = (trainings: Training[]): number =>
    trainings.reduce(
        (acc, training) =>
            acc +
            training.exercises.reduce(
                (exerciseAcc, exercise) => exerciseAcc + calculateWorkload(exercise),
                0,
            ),
        0,
    );

export const getTotalReplays = (trainings: Training[]): number =>
    trainings.reduce(
        (acc, training) =>
            acc +
            training.exercises.reduce((exerciseAcc, exercise) => exerciseAcc + exercise.replays, 0),
        0,
    );

export const getTotalApproaches = (trainings: Training[]): number =>
    trainings.reduce(
        (acc, training) =>
            acc +
            training.exercises.reduce(
                (exerciseAcc, exercise) => exerciseAcc + exercise.approaches,
                0,
            ),
        0,
    );

export const getAverageWorkload = (trainings: Training[]): number => {
    const { totalWorkload, totalExercises } = trainings.reduce(
        (acc, training) => {
            training.exercises.forEach((exercise) => {
                acc.totalWorkload += calculateWorkload(exercise);
                acc.totalExercises += 1;
            });

            return acc;
        },
        { totalWorkload: 0, totalExercises: 0 },
    );

    const averageWorkload = totalExercises > 0 ? totalWorkload / totalExercises : 0;

    return Math.round(averageWorkload);
};

export const getMostPopularExercise = (trainings: Training[]): PopularExercise | null => {
    const exerciseCounts: { [name: string]: number } = {};

    trainings.forEach((training) => {
        training.exercises.forEach((exercise) => {
            exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1;
        });
    });

    const sortedExerciseCounts = Object.entries(exerciseCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    const mostPopularExercise =
        sortedExerciseCounts.length > 0
            ? { name: sortedExerciseCounts[0].name, count: sortedExerciseCounts[0].count }
            : null;

    return mostPopularExercise;
};

export const getMostPopularExerciseForEachDay = (
    data: Array<{ date: Date; trainings: Training[] }>,
): Array<{ date: string; mostPopularExercise: PopularExercise | null }> =>
    data.map(({ date, trainings }) => {
        const mostPopularExercise = getMostPopularExercise(trainings);

        return { date: date.toISOString(), mostPopularExercise };
    });

export const findMostDemandingTrainingType = (
    trainings: Training[],
    trainingList: TrainingList,
): string | null => {
    const workoutTypeWorkloads: { [key: string]: number } = {};

    trainingList.forEach((training) => {
        workoutTypeWorkloads[training.name] = 0;
    });

    trainings.forEach((training) => {
        const workoutTypeName = training.name;
        const totalWorkload = training.exercises.reduce(
            (acc, exercise) => acc + calculateWorkload(exercise),
            0,
        );

        workoutTypeWorkloads[workoutTypeName] += totalWorkload;
    });

    let mostDemandingTrainingType: string | null = null;
    let maxWorkload = -Infinity;

    trainingList.forEach((training) => {
        const workoutTypeName = training.name;

        if (workoutTypeWorkloads[workoutTypeName] > maxWorkload) {
            mostDemandingTrainingType = workoutTypeName;
            maxWorkload = workoutTypeWorkloads[workoutTypeName];
        }
    });

    return trainingList.find((item) => item.name === mostDemandingTrainingType)?.key || null;
};

export const convertDataForPieChart = (
    data: Array<{ date: string; mostPopularExercise: PopularExercise | null }>,
): PopularExercise[] => {
    const result: { [name: string]: number } = {};

    data.forEach(({ mostPopularExercise }) => {
        if (mostPopularExercise) {
            if (result[mostPopularExercise.name]) {
                result[mostPopularExercise.name] += mostPopularExercise.count;
            } else {
                result[mostPopularExercise.name] = mostPopularExercise.count;
            }
        }
    });

    const formattedData: PopularExercise[] = Object.keys(result).map((name) => ({
        name,
        count: result[name],
    }));

    return formattedData;
};
