import { push } from 'redux-first-history';
import PATHS from '@constants/paths';
import { WrapperWide } from '@pages/auth-page/_components/result/wrapper-wide';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const ErrorCheckEmailNoExist = () => {
    const dispatch = useAppDispatch();

    return (
        <WrapperWide>
            <Result
                status='error'
                title='Такой e-mail не зарегистрирован'
                subTitle={
                    <span>
                        Мы не нашли в базе вашего e-mail. Попробуйте{' '}
                        <span style={{ whiteSpace: 'nowrap' }}>войти с другим e-mail.</span>
                    </span>
                }
                extra={
                    <Button
                        type='primary'
                        size='large'
                        data-test-id='check-retry-button'
                        onClick={() => dispatch(push(PATHS.AUTH))}
                    >
                        Попробовать снова
                    </Button>
                }
            />
        </WrapperWide>
    );
};
