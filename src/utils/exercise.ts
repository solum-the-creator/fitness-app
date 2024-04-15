import { Exercise, Training, TrainingList } from '@redux/api/types';
import { nanoid } from 'nanoid';

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

export const getMostPopularExercise = (trainings: Training[]): string | null => {
    const exerciseCounts: Array<{ name: string; count: number }> = [];

    trainings.forEach((training) => {
        training.exercises.forEach((exercise) => {
            const index = exerciseCounts.findIndex((item) => item.name === exercise.name);

            if (index >= 0) {
                exerciseCounts[index].count += 1;
            } else {
                exerciseCounts.push({ name: exercise.name, count: 1 });
            }
        });
    });

    return exerciseCounts.sort((a, b) => b.count - a.count).length > 0
        ? exerciseCounts[0].name
        : null;
};

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
