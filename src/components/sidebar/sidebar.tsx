import { Logo } from '@components/logo';
import { Button, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import styles from './sidebar.module.scss';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { ExitIcon } from '@components/icons/exit-icon';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export const Sidebar = () => {
    const matches = useMediaQuery({ query: `(max-width: 768px)` });
    const [collapsed, setCollapsed] = useState(matches);

    useEffect(() => {
        if (matches) {
            setCollapsed(true);
        }
    }, [matches]);

    const menuItems = [
        {
            key: '1',
            icon: <CalendarTwoTone style={{ fontSize: '16px' }} />,
            label: 'Календарь',
        },
        {
            key: '2',
            icon: <HeartFilled style={{ fontSize: '16px' }} />,
            label: 'Тренировки',
        },
        {
            key: '3',
            icon: <TrophyFilled style={{ fontSize: '16px' }} />,
            label: 'Достижения',
        },
        {
            key: '4',
            icon: (
                <IdcardOutlined
                    style={{
                        fontSize: '16px',
                        transform: 'scaleX(0.8)',
                    }}
                />
            ),
            label: 'Профиль',
        },
        {
            key: '5',
            icon: <TrophyFilled style={{ fontSize: '16px' }} />,
            label: <Link to={'/result/test'}>Тест</Link>,
        },
    ];

    const onClick = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider
            width={matches ? 106 : 208}
            collapsible
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={matches ? 1 : 64}
            className={styles.sidebar}
        >
            <div className={styles.logo}>
                <Logo collapsed={collapsed} matches={matches} />
            </div>
            {(!matches || !collapsed) && (
                <Menu
                    defaultSelectedKeys={undefined}
                    items={menuItems}
                    mode='inline'
                    inlineIndent={matches ? 0 : 16}
                    className={styles.menu}
                />
            )}

            <div className={styles.toggle_container} data-test-id='sider-switch-mobile'>
                <div className={styles.trapezoid_container}>
                    <div className={styles.trapezoid} />
                </div>
                <Button
                    onClick={onClick}
                    type='text'
                    className={styles.toggle_button}
                    data-test-id='sider-switch'
                >
                    {collapsed ? (
                        <MenuUnfoldOutlined style={{ color: '#8C8C8C' }} />
                    ) : (
                        <MenuFoldOutlined style={{ color: '#8C8C8C' }} />
                    )}
                </Button>
            </div>

            <Button type='text' className={styles.exit} size='large'>
                {!matches && <ExitIcon />}
                {!collapsed && 'Выход'}
            </Button>
        </Sider>
    );
};
