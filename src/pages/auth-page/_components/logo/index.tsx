import { Image } from 'antd';

import styles from './logo.module.scss';

import logo from '/logo_login.svg';

export const Logo = () => (
    <div className={styles.logo_container}>
        <Image preview={false} src={logo} className={styles.logo} />
    </div>
);
