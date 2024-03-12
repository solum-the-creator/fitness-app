import { Button, Modal, Result } from 'antd';
import styles from './error-modal.module.scss';

type ErrorModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
};

export const ErrorModal = ({ isModalOpen, onClose }: ErrorModalProps) => (
    <Modal
        open={isModalOpen}
        centered
        footer={null}
        closable={false}
        wrapClassName={styles.modal_wrap}
        className={styles.modal}
        width={'100%'}
        bodyStyle={{ padding: '64px 32px 56px' }}
        transitionName=''
        maskTransitionName=''
        maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.5)' }}
        data-test-id='modal-no-review'
    >
        <Result
            status={'500'}
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте&nbsp;ещё&nbsp;раз.'
            className={styles.result}
            extra={
                <Button
                    type='primary'
                    size='large'
                    data-test-id='check-back-button'
                    onClick={onClose}
                    className={styles.button}
                >
                    Назад
                </Button>
            }
        />
    </Modal>
);
