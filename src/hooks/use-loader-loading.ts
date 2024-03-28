import { useEffect } from 'react';
import { setIsLoading } from '@redux/loader/loader-slice';

import { useAppDispatch } from '.';

export const useLoaderLoading = (isLoading: boolean) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoading(isLoading));

        return () => {
            dispatch(setIsLoading(false));
        };
    }, [isLoading, dispatch]);
};
