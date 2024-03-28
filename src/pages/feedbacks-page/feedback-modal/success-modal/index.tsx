import { Button, Modal, Result } from 'antd';

import styles from './success-modal.module.scss';

type SuccessModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
};

export const SuccessModal = ({ isModalOpen, onClose }: SuccessModalProps) => (
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
            status='success'
            title='Отзыв успешно опубликован'
            extra={
                <Button
                    type='primary'
                    size='large'
                    className={styles.button}
                    block={true}
                    onClick={onClose}
                >
                    Отлично
                </Button>
            }
        />
    </Modal>
);
