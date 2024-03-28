import { useCallback, useEffect } from 'react';
import { Modal } from 'antd';

import styles from './error-modal.module.scss';

type ErrorModalProps = {
    isError: boolean;
    onClose: () => void;
};

export const ErrorModal = ({ isError, onClose }: ErrorModalProps) => {
    const showErrorModal = useCallback(
        () =>
            Modal.error({
                title: <span>При сохранении данных произошла ошибка</span>,
                content: <span>Придётся попробовать ещё раз</span>,
                closable: false,
                centered: true,
                okText: <span>Закрыть</span>,

                width: '100%',
                transitionName: '',
                maskTransitionName: '',
                maskStyle: {
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(121, 156, 212, 0.1)',
                    zIndex: 11,
                },
                okButtonProps: {
                    size: 'large',
                },
                className: styles.error_modal,
                wrapClassName: styles.error_modal_wrapper,
                onOk: () => onClose(),
            }),
        [onClose],
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
