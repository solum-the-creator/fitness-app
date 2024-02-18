import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { Button, Result } from 'antd';

export const Error = () => {
    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Что-то пошло не так и ваша регистрация не&nbsp;завершилась. Попробуйте ещё раз.'
                extra={
                    <Button type='primary' size='large' block>
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
