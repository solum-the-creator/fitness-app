import { WrapperWide } from '@pages/auth-page/_components/result/wrapper-wide';
import { Button, Result } from 'antd';

export const ErrorCheckEmail = () => {
    return (
        <WrapperWide>
            <Result
                status={'500'}
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                extra={
                    <Button type='primary' size='large' data-test-id='check-back-button'>
                        Назад
                    </Button>
                }
            />
        </WrapperWide>
    );
};
