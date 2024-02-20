import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

import { replace } from 'redux-first-history';

export const ErrorLogin = () => {
    const dispatch = useAppDispatch();

    return (
        <Wrapper>
            <Result
                status={'warning'}
                title='Вход не выполнен'
                subTitle='Что-то пошло не так. Попробуйте еще раз'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => dispatch(replace('/auth'))}
                        block
                        data-test-id='login-retry-button'
                    >
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
