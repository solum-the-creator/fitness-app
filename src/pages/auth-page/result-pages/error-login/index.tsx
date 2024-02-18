import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { Button, Result } from 'antd';

export const ErrorLogin = () => {
    return (
        <Wrapper>
            <Result
                status={'warning'}
                title='Вход не выполнен'
                subTitle='Что-то пошло не так. Попробуйте еще раз'
                extra={
                    <Button type='primary' size='large' block>
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
