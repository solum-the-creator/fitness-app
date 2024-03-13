import styles from './training-modal.module.scss';

import { Button, Empty } from 'antd';
import emptyImage from '/empty-image-fit.svg';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';

type TrainingModalProps = {
    onClose: () => void;
    fullscreen: boolean;
    weekDay: number;
    position: { top: number; left: number; right: number; bottom: number };
};

export const TrainingModal = ({ onClose, fullscreen, weekDay, position }: TrainingModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isLeftSide, setIsLeftSide] = useState(weekDay % 7 !== 0);

    const positionFullscreen = isLeftSide ? { top: 0, left: 0 } : { top: 0, right: 0 };
    const positionMobile = { top: position.bottom };
    const positionModal = fullscreen ? positionFullscreen : positionMobile;

    const modalClass = fullscreen ? styles.fullscreen_modal : styles.mobile_modal;

    const handleModalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClose();
    };

    useEffect(() => {
        const handleResize = () => {
            if (modalRef.current) {
                const { right } = modalRef.current.getBoundingClientRect();
                const windowWidth = window.innerWidth;

                if (isLeftSide) {
                    if (right + 20 > windowWidth) {
                        setIsLeftSide(false);
                    }
                }
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isLeftSide]);

    return (
        <div
            className={`${modalClass} ${styles.modal}`}
            style={{ ...positionModal, position: fullscreen ? 'absolute' : 'fixed' }}
            ref={modalRef}
        >
            <div className={styles.modal_header}>
                <div className={styles.header_content}>
                    <h4 className={styles.modal_title}>Тренировки на 09.01.2024</h4>
                    <p className={styles.modal_subtitle}>Нет активных тренировок</p>
                </div>
                <Button
                    type='text'
                    icon={<CloseOutlined style={{ fontSize: '12px', color: '#262626' }} />}
                    onClick={handleModalClose}
                    className={styles.button_close}
                />
            </div>
            <div className={styles.modal_main}>
                <Empty
                    image={emptyImage}
                    description=''
                    imageStyle={{ height: 32, margin: '0' }}
                    className={styles.empty}
                />
            </div>
            <div className={styles.modal_footer}>
                <Button type='primary' size='large' block>
                    Создать тренировку
                </Button>
            </div>
        </div>
    );
};
