import React, { useState } from 'react';
import { ErrorTrainingList } from '@components/modals/error-training-list';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetInviteQuery, useLazyGetUserJointTrainingListQuery } from '@redux/api/api-slice';
import { TrainingList } from '@redux/api/types';
import { Moment } from 'moment';

import { MessagesList } from './messages-list';
import { TrainingPartnerSelection } from './training-partner-selection';
import { TrainingPartners } from './training-partners';
import { UserJointTrainingList } from './user-joint-training-list';

import styles from './joint-trainings.module.scss';

type JointTrainingsProps = {
    trainingType: string | null;
    trainingList: TrainingList;
    trainingDates: Moment[];
};

export const JointTrainings = ({
    trainingType,
    trainingList,
    trainingDates,
}: JointTrainingsProps) => {
    const [getUserJointTrainingList, { isFetching, data: userJointTrainingList = [] }] =
        useLazyGetUserJointTrainingListQuery();
    const { data: invites = [], isLoading } = useGetInviteQuery();

    useLoaderLoading(isFetching || isLoading);

    const [showTrainingList, setShowTrainingList] = useState(false);
    const [isError, setIsError] = useState(false);
    const [lastCallType, setLastCallType] = useState<string | null>(null);

    const onShowRandomTrainingList = async () => {
        setLastCallType('random');
        try {
            await getUserJointTrainingList().unwrap();
            setShowTrainingList(true);
        } catch {
            setIsError(true);
        }
    };

    const onShowTrainingListByType = async (type: string) => {
        setLastCallType('type');
        try {
            await getUserJointTrainingList({ trainingType: type }).unwrap();
            setShowTrainingList(true);
        } catch {
            setIsError(true);
        }
    };

    const onBack = () => {
        setShowTrainingList(false);
    };

    const refetch = () => {
        setIsError(false);
        if (lastCallType === 'random') {
            onShowRandomTrainingList();
        } else if (lastCallType === 'type' && trainingType) {
            onShowTrainingListByType(trainingType);
        }
    };

    return (
        <div className={styles.main_container}>
            {showTrainingList ? (
                <UserJointTrainingList
                    trainingList={trainingList}
                    users={userJointTrainingList}
                    trainingDates={trainingDates}
                    onBack={onBack}
                />
            ) : (
                <React.Fragment>
                    {invites.length > 0 && <MessagesList invites={invites} />}

                    <TrainingPartnerSelection
                        selectRandom={onShowRandomTrainingList}
                        selectByType={() => onShowTrainingListByType(trainingType || '')}
                    />

                    <TrainingPartners />
                </React.Fragment>
            )}
            <ErrorTrainingList
                onClose={() => setIsError(false)}
                isError={isError}
                refetch={refetch}
            />
        </div>
    );
};
