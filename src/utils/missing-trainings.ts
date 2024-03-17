import { TrainingList, TrainingResponse } from '@redux/api/types';

export const missingTrainings = (
    trainingList: TrainingList,
    trainings: TrainingResponse[],
): TrainingList => {
    return trainingList.filter(
        (training) => !trainings.some((item) => item.name === training.name),
    );
};
