import { goBack } from 'redux-first-history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@redux/configure-store';
import { Button } from 'antd';

import styles from './header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(goBack());
    };

    return (
        <header className={styles.header}>
            <Button
                type='text'
                className={styles.button_back}
                icon={<ArrowLeftOutlined />}
                onClick={onClick}
                data-test-id='settings-back'
            >
                Настроики
            </Button>
        </header>
    );
};
