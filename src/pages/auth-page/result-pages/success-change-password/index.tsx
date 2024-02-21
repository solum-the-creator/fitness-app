import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { replace } from 'redux-first-history';

export const SuccessChangePassword = () => {
    const dispatch = useAppDispatch();
    return (
        <Wrapper>
            <Result
                status={'success'}
                title='Пароль успешно изменен'
                subTitle='Теперь можно войти в аккаунт, используя свой&nbsp;логин и новый пароль'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block
                        data-test-id='change-entry-button'
                        onClick={() => dispatch(replace('/auth'))}
                    >
                        Вход
                    </Button>
                }
            />
        </Wrapper>
    );
};
