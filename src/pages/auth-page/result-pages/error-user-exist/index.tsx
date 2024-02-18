import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { Button, Result } from 'antd';

export const ErrorUserExist = () => {
    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={
                    <Button type='primary' size='large' block>
                        Назад к регистрации
                    </Button>
                }
            />
        </Wrapper>
    );
};
