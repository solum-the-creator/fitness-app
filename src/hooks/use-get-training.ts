import { useLazyGetTrainingQuery } from '@redux/api/apiSlice';
import { useLoaderLoading } from './use-loader-loading';
import PATHS from '@constants/paths';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@redux/configure-store';
import { useState } from 'react';

export const useGetLazyTraining = () => {
    const dispatch = useAppDispatch();
    const [getTraining, { isFetching }] = useLazyGetTrainingQuery();
    useLoaderLoading(isFetching);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const onGetTraining = async () => {
        try {
            await getTraining().unwrap();
            dispatch(push(PATHS.CALENDAR));
        } catch {
            setIsErrorModalOpen(true);
        }
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    return {
        onGetTraining,
        closeErrorModal,
        isErrorModalOpen,
    };
};
