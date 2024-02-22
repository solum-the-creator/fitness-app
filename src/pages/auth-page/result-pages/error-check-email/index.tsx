import { WrapperWide } from '@pages/auth-page/_components/result/wrapper-wide';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import { replace } from 'redux-first-history';

export const ErrorCheckEmail = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const onBack = () => {
        dispatch(
            replace('/auth', {
                fromErrorCheckEmail: true,
                email: location.state?.email,
            }),
        );
    };

    return (
        <WrapperWide>
            <Result
                status={'500'}
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        data-test-id='check-back-button'
                        onClick={onBack}
                    >
                        Назад
                    </Button>
                }
            />
        </WrapperWide>
    );
};
