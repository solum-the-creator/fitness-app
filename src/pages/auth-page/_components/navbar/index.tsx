import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PATHS from '@constants/paths';
import { Menu } from 'antd';

import styles from './navbar.module.scss';

type MenuItem = {
    label: React.ReactNode;
    key: string;
};

export const Navbar = () => {
    const location = useLocation();
    const [current, setCurrent] = useState<string>(location.pathname);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location]);

    const items: MenuItem[] = [
        {
            label: <Link to={PATHS.AUTH}>Вход</Link>,
            key: PATHS.AUTH,
        },
        {
            label: <Link to={PATHS.REGISTRATION}>Регистрация</Link>,
            key: PATHS.REGISTRATION,
        },
    ];

    return (
        <div className={styles.navbar_container}>
            <Menu
                mode='horizontal'
                selectedKeys={[current]}
                items={items}
                className={styles.navbar}
            />
        </div>
    );
};
