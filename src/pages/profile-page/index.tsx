import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';

export const ProfilePage = () => {
    const user = useAppSelector(userSelector);

    console.log(user);

    return <div>user-page</div>;
};
