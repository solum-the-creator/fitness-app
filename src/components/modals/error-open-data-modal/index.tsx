import { useCallback, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import styles from './error-open-data-modal.scss';

type ErrorOpenDataModalProps = {
    isError: boolean;
    refetch: () => void;
    onClose?: () => void;
};

export const ErrorOpenDataModal = ({ isError, refetch, onClose }: ErrorOpenDataModalProps) => {
    const showErrorModal = useCallback(
        () =>
            Modal.error({
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        При открытии данных произошла ошибка
                    </span>
                ),
                content: (
                    <span data-test-id='modal-error-user-training-subtitle'>
                        Попробуйте ещё раз.
                    </span>
                ),
                closable: true,
                centered: true,
                okText: <span data-test-id='modal-error-user-training-button'>Обновить</span>,
                closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
                width: '100%',
                transitionName: '',
                maskTransitionName: '',
                maskStyle: {
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(121, 156, 212, 0.1)',
                    zIndex: 11,
                },
                className: styles.error_modal,
                wrapClassName: styles.error_modal_wrapper,

                onOk: () => refetch(),
                onCancel: onClose,
            }),
        [refetch, onClose],
    );

    useEffect(() => {
        let errorModal: ReturnType<typeof Modal.error> | null = null;

        if (isError) {
            errorModal = showErrorModal();
        }

        return () => {
            if (errorModal) {
                errorModal.destroy();
            }
        };
    }, [isError, showErrorModal]);

    return null;
};
