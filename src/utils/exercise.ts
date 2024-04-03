import { Exercise } from '@redux/api/types';
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
