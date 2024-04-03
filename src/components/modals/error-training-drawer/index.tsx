import { useCallback, useEffect } from 'react';
import { Modal } from 'antd';

import styles from './error-training-drawer.module.scss';

type ErrorTrainingDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};
export const ErrorTrainingDrawer = ({ isOpen, onClose }: ErrorTrainingDrawerProps) => {
    const showErrorModal = useCallback(
        () =>
            Modal.error({
                title: <span>При сохранении данных произошла ошибка</span>,
                content: <span>Придётся попробовать ещё раз</span>,
                closable: false,
                centered: true,
                okText: <span>Закрыть</span>,
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
