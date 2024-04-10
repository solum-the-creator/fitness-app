import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './drawer-header.module.scss';

type DrawerHeaderProps = {
    onClose: () => void;
};

export const DrawerHeader = ({ onClose }: DrawerHeaderProps) => (
    <div className={styles.drawer_header}>
        <span className={styles.drawer_icon}>
            <PlusOutlined />
        </span>
        <h4 className={styles.drawer_title}>Совместная тренировка</h4>
        <Button
            type='text'
            icon={<CloseOutlined style={{ fontSize: '14px' }} />}
            onClick={onClose}
            className={styles.button_close}
            data-test-id='modal-drawer-right-button-close'
        />
    </div>
);
