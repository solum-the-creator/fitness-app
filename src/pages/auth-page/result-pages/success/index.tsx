import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { Button, Result } from 'antd';

export const Success = () => {
    return (
        <Wrapper>
            <Result
                status={'success'}
                title='Регистрация успешна'
                subTitle='Регистрация прошла успешно. Зайдите в&nbsp;приложение, используя свои e-mail и пароль.'
                extra={
                    <Button type='primary' size='large' block>
                        Войти
                    </Button>
                }
            />
        </Wrapper>
    );
};
