import styles from './training-display.module.scss';

import emptyImage from '/empty-image-fit.svg';
import { Moment } from 'moment';
import { Button, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type TrainingDisplayProps = {
    onClose: () => void;
    onCreate: () => void;
    selectedDate: Moment;
};

export const TrainingDisplay = ({ onClose, selectedDate, onCreate }: TrainingDisplayProps) => {
    const handleModalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClose();
    };

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCreate();
    };

    return (
        <>
            <div className={styles.modal_header}>
                <div className={styles.header_content}>
                    <h4 className={styles.modal_title}>
                        Тренировки на {selectedDate.format('DD.MM.YYYY')}
                    </h4>
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
                <Button type='primary' size='large' block onClick={handleCreate}>
                    Создать тренировку
                </Button>
            </div>
        </>
    );
};
