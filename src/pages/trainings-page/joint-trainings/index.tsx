import { useState } from 'react';
import { ErrorTrainingList } from '@components/modals/error-training-list';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useGetInviteQuery, useLazyGetUserJointTrainingListQuery } from '@redux/api/api-slice';
import { TrainingList } from '@redux/api/types';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { setUserJointList } from '@redux/user-joint-list/user-joint-list-slice';
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
    const [getUserJointTrainingList, { isFetching }] = useLazyGetUserJointTrainingListQuery();
    const { data: invites = [], isLoading } = useGetInviteQuery();
    const dispatch = useAppDispatch();

    const trainingPals = useAppSelector((state) => state.trainingPartners);

    useLoaderLoading(isFetching || isLoading);

    const [showTrainingList, setShowTrainingList] = useState(false);
    const [isError, setIsError] = useState(false);
    const [lastCallType, setLastCallType] = useState<string | null>(null);

    const canShowTrainingSelection = trainingPals.length <= 4;

    const onShowRandomTrainingList = async () => {
        setLastCallType('random');
        try {
            const userList = await getUserJointTrainingList().unwrap();

            dispatch(setUserJointList(userList));
            setShowTrainingList(true);
        } catch {
            setIsError(true);
        }
    };

    const onShowTrainingListByType = async (type: string) => {
        setLastCallType('type');
        try {
            const userListByType = await getUserJointTrainingList({
                trainingType: type,
            }).unwrap();

            dispatch(setUserJointList(userListByType));

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
                    trainingDates={trainingDates}
                    onBack={onBack}
                />
            ) : (
                <div className={styles.content_container}>
                    {invites.length > 0 && (
                        <MessagesList invites={invites} trainingList={trainingList} />
                    )}
                    {canShowTrainingSelection && (
                        <TrainingPartnerSelection
                            selectRandom={onShowRandomTrainingList}
                            selectByType={() => onShowTrainingListByType(trainingType || '')}
                        />
                    )}

                    <TrainingPartners />
                </div>
            )}
            <ErrorTrainingList
                onClose={() => setIsError(false)}
                isError={isError}
                refetch={refetch}
            />
        </div>
    );
};
