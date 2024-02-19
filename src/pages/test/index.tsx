import { useGetHealthmonitorQuery, useGetMeQuery } from '@redux/api/apiSlice';

export const TestPage = () => {
    const { data, isError, isFetching } = useGetMeQuery();

    if (isFetching) return <div>Loading...</div>;

    if (isError) {
        return <div>Error</div>;
    }

    if (data) return <div>{data.email}</div>;

    return null;
};
