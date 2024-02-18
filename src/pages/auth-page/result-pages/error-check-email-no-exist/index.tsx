import { WrapperWide } from '@pages/auth-page/_components/result/wrapper-wide';
import { Button, Result } from 'antd';

export const ErrorCheckEmailNoExist = () => {
    return (
        <WrapperWide>
            <Result
                status={'error'}
                title='Такой e-mail не зарегистрирован'
                subTitle={
                    <span>
                        Мы не нашли в базе вашего e-mail. Попробуйте{' '}
                        <span style={{ whiteSpace: 'nowrap' }}>войти с другим e-mail.</span>
                    </span>
                }
                extra={
                    <Button type='primary' size='large' block>
                        Попробовать снова
                    </Button>
                }
            />
        </WrapperWide>
    );
};
