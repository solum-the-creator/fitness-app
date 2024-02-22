import { Image } from 'antd';
import styles from './logo.module.scss';
import logo from '/logo.svg';

export const Logo = () => {
    return (
        <div className={styles.logo_container}>
            <Image preview={false} src={logo} className={styles.logo} />
        </div>
    );
};
