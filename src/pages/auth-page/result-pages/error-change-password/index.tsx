import { useLocation } from 'react-router-dom';
import { replace } from 'redux-first-history';
import { Wrapper } from '@components/result/wrapper';
import PATHS from '@constants/paths';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const ErrorChangePassword = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const formValues = location.state?.formValues;

    const onReapeat = () => {
        dispatch(
            replace(PATHS.CHANGE_PASSWORD, {
                isRepeat: true,
                formValues,
                fromResult: true,
            }),
        );
    };

    return (
        <Wrapper>
            <Result
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
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
