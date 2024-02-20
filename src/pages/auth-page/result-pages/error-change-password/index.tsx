import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { Button, Result } from 'antd';

export const ErrorChangePassword = () => {
    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз'
                extra={
                    <Button type='primary' size='large' block data-test-id='change-retry-button'>
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
