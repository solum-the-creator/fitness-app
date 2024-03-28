import { replace } from 'redux-first-history';
import PATHS from '@constants/paths';
import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const ErrorUserExist = () => {
    const dispatch = useAppDispatch();

    return (
        <Wrapper>
            <Result
                status='error'
                title='Данные не сохранились'
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        onClick={() => dispatch(replace(`${PATHS.AUTH}/registration`))}
                        data-test-id='registration-back-button'
                    >
                        Назад к регистрации
                    </Button>
                }
            />
        </Wrapper>
    );
};
