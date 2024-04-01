import { TrainingList, TrainingResponse } from '@redux/api/types';

import { EmptyTrainings } from './empty-trainings';

import styles from './my-trainings.module.scss';

type MyTrainingsProps = {
    trainings: TrainingResponse[];
    trainingList: TrainingList;
};

export const MyTrainings = ({ trainings, trainingList }: MyTrainingsProps) => {
    const isEmpty = trainings.length === 0;

    return (
        <div className={styles.main_container}>
            {true ? <EmptyTrainings /> : <div>Мои тренировки</div>}
        </div>
    );
};
