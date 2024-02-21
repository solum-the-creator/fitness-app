import styles from './confirm-email.module.scss';

import { Result } from 'antd';
import { WrapperWide } from '../_components/result/wrapper-wide';
import VerificationInput from 'react-verification-input';

export const ConfirmEmailPage = () => {
    return (
        <WrapperWide className={styles.wrapper}>
            <Result
                title={
                    <>
                        Введите код <br />
                        для восстановления аккаунта
                    </>
                }
                subTitle={
                    <>
                        Мы отправили вам на e-mail <strong>victorbyden@gmail.com</strong> <br />
                        шестизначный код. Введите его в поле ниже.
                    </>
                }
                extra={
                    <div className={styles.extra_container}>
                        <VerificationInput
                            placeholder=''
                            autoFocus
                            classNames={{
                                container: styles.verification_container,
                                character: styles.character,
                                characterInactive: styles.character_inactive,
                            }}
                        />
                        <p className={styles.text}>Не пришло письмо? Проверьте папку&nbsp;Спам.</p>
                    </div>
                }
            />
        </WrapperWide>
    );
};
