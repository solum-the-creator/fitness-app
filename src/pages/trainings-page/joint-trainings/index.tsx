import { TrainingPartnerSelection } from './training-partner-selection';

import styles from './joint-trainings.module.scss';

export const JointTrainings = () => (
    <div className={styles.main_container}>
        <TrainingPartnerSelection selectRandom={() => {}} selectByType={() => {}} />
        <div>Мои партнёры по тренировкам</div>
    </div>
);
