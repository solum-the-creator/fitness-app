import { useLazyGetTrainingQuery } from '@redux/api/apiSlice';
import { useLoaderLoading } from './use-loader-loading';
import PATHS from '@constants/paths';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@redux/configure-store';

export const useGetLazyTraining = () => {
    const dispatch = useAppDispatch();
    const [getTraining, { isFetching }] = useLazyGetTrainingQuery();
    useLoaderLoading(isFetching);

    const onGetTraining = async (name = '') => {
        try {
            await getTraining(name).unwrap();
            dispatch(push(PATHS.CALENDAR));
        } catch (error) {
            // TODO: add error handling
            console.log(error);
        }
    };

    return {
        onGetTraining,
    };
};
