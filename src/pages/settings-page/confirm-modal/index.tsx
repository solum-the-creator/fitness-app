import { useLogout } from '@hooks/use-logout';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { Modal, Result } from 'antd';

import styles from './confirm-modal.module.scss';

type ConfirmModalProps = {
    isModalOpen: boolean;
};

export const ConfirmModal = ({ isModalOpen }: ConfirmModalProps) => {
    const user = useAppSelector(userSelector);
    const logout = useLogout();

    const onCancel = () => {
        logout();
    };

    return (
        <Modal
            open={isModalOpen}
            centered={true}
            footer={null}
            closable={true}
            wrapClassName={styles.modal_wrap}
            className={styles.modal}
            width='100%'
            transitionName=''
            maskTransitionName=''
            maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.1)' }}
            onCancel={onCancel}
            data-test-id='tariff-modal-success'
        >
            <Result
                status='info'
                title='Чек для оплаты у&nbsp;вас&nbsp;на&nbsp;почте'
                subTitle={
                    <span>
                        Мы отправили инструкцию для оплаты вам на e-mail {user.email}. После
                        подтверждения оплаты войдите в&nbsp;приложение заново.
                    </span>
                }
                className={styles.result}
                extra='Не пришло письмо? Проверьте папку&nbsp;Спам.'
            />
        </Modal>
    );
};
