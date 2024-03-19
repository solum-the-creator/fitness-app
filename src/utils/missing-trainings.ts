import { TrainingList, TrainingResponse } from '@redux/api/types';

export const missingTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList => {
    return trainingList.filter(
        (training) => !trainings.some((item) => item.name === training.name),
    );
};

export const unimplementedTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList => {
    return trainingList.filter(
        (training) =>
            !trainings.some((item) => item.name === training.name && item.isImplementation),
    );
};

export const availableTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList => {
    return trainingList.filter((training) =>
        trainings.some((item) => item.name === training.name && !item.isImplementation),
    );
};
