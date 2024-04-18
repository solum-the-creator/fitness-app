import { replace } from 'redux-first-history';
import { Wrapper } from '@components/result/wrapper';
import PATHS from '@constants/paths';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const ErrorLogin = () => {
    const dispatch = useAppDispatch();

    return (
        <Wrapper>
            <Result
                status='warning'
                title='Вход не выполнен'
                subTitle='Что-то пошло не так. Попробуйте еще раз'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => dispatch(replace(PATHS.AUTH))}
                        block={true}
                        data-test-id='login-retry-button'
                    >
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
