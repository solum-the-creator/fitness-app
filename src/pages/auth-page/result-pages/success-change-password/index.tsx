import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { Button, Result } from 'antd';

export const SuccessChangePassword = () => {
    return (
        <Wrapper>
            <Result
                status={'success'}
                title='Пароль успешно изменен'
                subTitle='Теперь можно войти в аккаунт, используя свой&nbsp;логин и новый пароль'
                extra={
                    <Button type='primary' size='large' block data-test-id='change-entry-button'>
                        Вход
                    </Button>
                }
            />
        </Wrapper>
    );
};
