import { replace } from 'redux-first-history';
import { Wrapper } from '@components/result/wrapper';
import PATHS from '@constants/paths';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';

export const SuccessChangePassword = () => {
    const dispatch = useAppDispatch();

    return (
        <Wrapper>
            <Result
                status='success'
                title='Пароль успешно изменен'
                subTitle='Теперь можно войти в аккаунт, используя свой&nbsp;логин и новый пароль'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        data-test-id='change-entry-button'
                        onClick={() => dispatch(replace(PATHS.AUTH))}
                    >
                        Вход
                    </Button>
                }
            />
        </Wrapper>
    );
};
