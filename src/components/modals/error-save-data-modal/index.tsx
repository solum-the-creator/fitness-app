import { useCallback, useEffect } from 'react';
import { Modal } from 'antd';

import styles from './error-save-data-modal.module.scss';

type ErrorSaveDataModalProps = {
    isOpen: boolean;
    onClose: () => void;
};
export const ErrorSaveDataModal = ({ isOpen, onClose }: ErrorSaveDataModalProps) => {
    const showErrorModal = useCallback(
        () =>
            Modal.error({
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        При сохранении данных произошла ошибка
                    </span>
                ),
                content: (
                    <span data-test-id='modal-error-user-training-subtitle'>
                        Придётся попробовать ещё раз
                    </span>
                ),
                closable: false,
                centered: true,
                okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
                width: '100%',
                maskStyle: {
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(121, 156, 212, 0.1)',
                    zIndex: 13,
                },
                className: styles.error_modal,
                wrapClassName: styles.error_modal_wrapper,
                onOk: onClose,
            }),
        [onClose],
    );

    useEffect(() => {
        let errorModal: ReturnType<typeof Modal.error> | null = null;

        if (isOpen) {
            errorModal = showErrorModal();
        }

        return () => {
            if (errorModal) {
                errorModal.destroy();
            }
        };
    }, [isOpen, showErrorModal]);

    return null;
};
