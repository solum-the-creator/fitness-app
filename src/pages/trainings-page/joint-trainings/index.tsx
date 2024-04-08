import React, { useState } from 'react';

import { TrainingPartnerSelection } from './training-partner-selection';
import { TrainingPartners } from './training-partners';
import { UserJointTrainingList } from './user-joint-training-list';

import styles from './joint-trainings.module.scss';

export const JointTrainings = () => {
    const [showTrainingList, setShowTrainingList] = useState(false);

    const onShowTrainingList = () => {
        setShowTrainingList(true);
    };

    return (
        <div className={styles.main_container}>
            {showTrainingList ? (
                <UserJointTrainingList />
            ) : (
                <React.Fragment>
                    <TrainingPartnerSelection
                        selectRandom={onShowTrainingList}
                        selectByType={onShowTrainingList}
                    />
                    <TrainingPartners />
                </React.Fragment>
            )}
        </div>
    );
};
