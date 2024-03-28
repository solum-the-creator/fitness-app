import { Button, Modal, Result } from 'antd';

import styles from './error-modal.module.scss';

type ErrorModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
    onRetry: () => void;
};

export const ErrorModal = ({ isModalOpen, onClose, onRetry }: ErrorModalProps) => (
    <Modal
        open={isModalOpen}
        centered={true}
        footer={null}
        closable={false}
        wrapClassName={styles.modal_wrap}
        className={styles.modal}
        width='100%'
        transitionName=''
        maskTransitionName=''
        maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.5)' }}
    >
        <Result
            className={styles.result}
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз.'
            extra={
                <div className={styles.buttons}>
                    <Button
                        type='primary'
                        size='large'
                        className={styles.button_feedback}
                        block={true}
                        onClick={onRetry}
                        data-test-id='write-review-not-saved-modal'
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type='default'
                        size='large'
                        className={styles.button_close}
                        block={true}
                        onClick={onClose}
                    >
                        Закрыть
                    </Button>
                </div>
            }
        />
    </Modal>
);
