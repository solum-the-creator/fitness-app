import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './drawer-header.module.scss';

type DrawerHeaderProps = {
    onClose: () => void;
    isEditable?: boolean;
};

export const DrawerHeader = ({ onClose, isEditable }: DrawerHeaderProps) => (
    <div className={styles.drawer_header}>
        <span className={styles.drawer_icon}>
            {isEditable ? <EditOutlined /> : <PlusOutlined />}
        </span>
        <h4 className={styles.drawer_title}>
            {isEditable ? 'Редактирование' : 'Добавление упражнений'}
        </h4>
        <Button
            type='text'
            icon={<CloseOutlined style={{ fontSize: '14px' }} />}
            onClick={onClose}
            className={styles.button_close}
            data-test-id='modal-drawer-right-button-close'
        />
    </div>
);
