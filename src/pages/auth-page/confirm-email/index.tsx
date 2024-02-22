import styles from './confirm-email.module.scss';

import { Result } from 'antd';
import { WrapperWide } from '../_components/result/wrapper-wide';
import VerificationInput from 'react-verification-input';
import { useLocation } from 'react-router-dom';
import { useConfirmEmailMutation } from '@redux/api/apiSlice';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useState } from 'react';
import { useAppDispatch } from '@redux/configure-store';
import { replace } from 'redux-first-history';

export const ConfirmEmailPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [code, setCode] = useState('');

    const [confirm, { isLoading }] = useConfirmEmailMutation();
    const [isError, setIsError] = useState(false);
    useLoaderLoading(isLoading);

    const errorTitle = isError ? 'Неверный код.' : '';
    const errorClass = isError && styles.error;

    const email = location.state.email as string;
    const handleComplete = async (code: string) => {
        try {
            await confirm({ email, code }).unwrap();
            dispatch(replace('/auth/change-password', { fromResult: true }));
        } catch (error) {
            setCode('');
            setIsError(true);
        }
    };

    return (
        <WrapperWide className={styles.wrapper}>
            <Result
                status={isError ? 'error' : 'info'}
                title={
                    <>
                        {errorTitle} Введите код <br />
                        для восстановления аккаунта
                    </>
                }
                subTitle={
                    <>
                        Мы отправили вам на e-mail <strong>{email}</strong> <br />
                        шестизначный код. Введите его в поле ниже.
                    </>
                }
                extra={
                    <div className={styles.extra_container}>
                        <VerificationInput
                            placeholder=''
                            validChars='0-9'
                            autoFocus
                            value={code}
                            onChange={(value) => setCode(value)}
                            onComplete={(value) => handleComplete(value)}
                            classNames={{
                                container: styles.verification_container,
                                character: `${styles.character} ${errorClass}`,
                                characterInactive: styles.character_inactive,
                                characterSelected: `${styles.character_selected} ${errorClass}`,
                            }}
                            inputProps={{
                                'data-test-id': 'verification-input',
                            }}
                        />
                        <p className={styles.text}>Не пришло письмо? Проверьте папку&nbsp;Спам.</p>
                    </div>
                }
            />
        </WrapperWide>
    );
};
