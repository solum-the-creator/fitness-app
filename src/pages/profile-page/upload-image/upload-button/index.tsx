import { useMediaQuery } from 'react-responsive';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { COLORS } from '@constants/styles';
import { Button } from 'antd';

import styles from './upload-button.module.scss';

export const UploadButton = () => {
    const matches = useMediaQuery({ query: '(max-width: 480px)' });

    const button = matches ? (
        <div className={styles.upload_mobile}>
            <span className={styles.label}>Загрузить фото профиля:</span>
            <Button icon={<UploadOutlined />} size='large' className={styles.button} block={true}>
                Загрузить
            </Button>
        </div>
    ) : (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                    color: COLORS.characterLightSecondary,
                    width: 'min-content',
                    lineHeight: 1.3,
                }}
            >
                Загрузить фото профиля
            </div>
        </div>
    );

    return button;
};
