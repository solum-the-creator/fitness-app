import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { replace } from 'redux-first-history';

export const ErrorUserExist = () => {
    const dispatch = useAppDispatch();
    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block
                        onClick={() => dispatch(replace('/auth/registration'))}
                        data-test-id='registration-back-button'
                    >
                        Назад к регистрации
                    </Button>
                }
            />
        </Wrapper>
    );
};
