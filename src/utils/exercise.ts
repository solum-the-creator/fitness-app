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

export const getTotalRepeats = (trainings: Training[]): number =>
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

// export const calculateDailyAverageWorkload = (
//     trainings: Training[],
//     countDays: number,
// ): number[] => {
//     const dailyWorkloads: number[] = new Array(countDays).fill(0);
//     const dailyTrainingCounts: number[] = new Array(countDays).fill(0);

//     trainings.forEach((training) => {
//         const trainingDate = new Date(training.date);
//         const dayOfWeek = trainingDate.getDay();

//         if (training.exercises.length > 0) {
//             training.exercises.forEach((exercise) => {
//                 dailyWorkloads[dayOfWeek] += calculateWorkload(exercise);
//             });
//             dailyTrainingCounts[dayOfWeek] += 1;
//         }
//     });

//     const dailyAverages: number[] = dailyWorkloads.map((workload, index) => {
//         if (dailyTrainingCounts[index] === 0) {
//             return 0;
//         }

//         return workload / dailyTrainingCounts[index];
//     });

//     return dailyAverages;
// };

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
