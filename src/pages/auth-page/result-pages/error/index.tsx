import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';

export const Error = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const onRepeat = () => {
        dispatch(
            push('/auth/registration', {
                fromResult: true,
                formValues: location.state?.formValues,
            }),
        );
    };

    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Что-то пошло не так и ваша регистрация не&nbsp;завершилась. Попробуйте ещё раз.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block
                        onClick={onRepeat}
                        data-test-id='registration-retry-button'
                    >
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
