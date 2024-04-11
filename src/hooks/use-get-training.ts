import { useState } from 'react';
import { push } from 'redux-first-history';
import { useLazyGetTrainingQuery } from '@redux/api/api-slice';
import { useAppDispatch } from '@redux/configure-store';

import { useLoaderLoading } from './use-loader-loading';

export const useGetLazyTraining = () => {
    const dispatch = useAppDispatch();
    const [getTraining, { isFetching }] = useLazyGetTrainingQuery();

    useLoaderLoading(isFetching);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const onGetTraining = async (path: string) => {
        try {
            await getTraining().unwrap();
            dispatch(push(path));
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
