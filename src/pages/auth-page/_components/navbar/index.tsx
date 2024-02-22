import { Menu } from 'antd';
import styles from './navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

type MenuKey = '/auth' | '/auth/registration';

type MenuItem = {
    label: React.ReactNode;
    key: MenuKey;
};

export const Navbar = () => {
    const location = useLocation();
    const [current, setCurrent] = useState<MenuKey>(location.pathname as MenuKey);

    useEffect(() => {
        setCurrent(location.pathname as MenuKey);
    }, [location]);

    const items: MenuItem[] = [
        {
            label: <Link to='/auth'>Вход</Link>,
            key: '/auth',
        },
        {
            label: <Link to='/auth/registration'>Регистрация</Link>,
            key: '/auth/registration',
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
