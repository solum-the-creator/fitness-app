import { replace } from 'redux-first-history';
import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const Success = () => {
    const dispatch = useAppDispatch();

    return (
        <Wrapper>
            <Result
                status='success'
                title='Регистрация успешна'
                subTitle='Регистрация прошла успешно. Зайдите в&nbsp;приложение, используя свои e-mail и пароль.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        onClick={() => dispatch(replace('/auth'))}
                        data-test-id='registration-enter-button'
                    >
                        Войти
                    </Button>
                }
            />
        </Wrapper>
    );
};
