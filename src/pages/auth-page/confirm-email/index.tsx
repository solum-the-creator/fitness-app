import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { replace } from 'redux-first-history';
import { WrapperWide } from '@components/result/wrapper-wide';
import PATHS from '@constants/paths';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useConfirmEmailMutation } from '@redux/api/api-slice';
import { useAppDispatch } from '@redux/configure-store';
import { Result } from 'antd';

import styles from './confirm-email.module.scss';

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
    const handleComplete = async (sendCode: string) => {
        try {
            await confirm({ email, code: sendCode }).unwrap();
            dispatch(replace(`${PATHS.AUTH}/change-password`, { fromResult: true }));
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
                    <React.Fragment>
                        {errorTitle} Введите код <br />
                        для восстановления аккаунта
                    </React.Fragment>
                }
                subTitle={
                    <React.Fragment>
                        Мы отправили вам на e-mail <strong>{email}</strong> <br />
                        шестизначный код. Введите его в поле ниже.
                    </React.Fragment>
                }
                extra={
                    <div className={styles.extra_container}>
                        <VerificationInput
                            placeholder=''
                            validChars='0-9'
                            autoFocus={true}
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
