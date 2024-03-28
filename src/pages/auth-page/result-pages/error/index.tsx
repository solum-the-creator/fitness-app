import { useLocation } from 'react-router-dom';
import { replace } from 'redux-first-history';
import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const Error = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const onRepeat = () => {
        dispatch(
            replace('/auth/registration', {
                fromResult: true,
                formValues: location.state?.formValues,
            }),
        );
    };

    return (
        <Wrapper>
            <Result
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так и ваша регистрация не&nbsp;завершилась. Попробуйте ещё раз.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
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
