import PATHS from '@constants/paths';
import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import { replace } from 'redux-first-history';

export const ErrorChangePassword = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const formValues = location.state?.formValues;

    const onReapeat = () => {
        dispatch(
            replace(`${PATHS.AUTH}/change-password`, {
                isRepeat: true,
                formValues: formValues,
                fromResult: true,
            }),
        );
    };

    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block
                        data-test-id='change-retry-button'
                        onClick={onReapeat}
                    >
                        Повторить
                    </Button>
                }
            />
        </Wrapper>
    );
};
