import { WarningFilled } from '@ant-design/icons';

import { Result } from '@pages/auth-page/_components/result';

export const ErrorLogin = () => {
    return (
        <Result type={'warning'} title='Вход не выполнен' icon={<WarningFilled />}>
            Что-то пошло не так. Попробуйте еще раз
        </Result>
    );
};
