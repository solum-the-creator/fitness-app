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
    exercise.replays * exercise.weight || 1 * exercise.approaches;

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
