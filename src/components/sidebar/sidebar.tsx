import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useLocation } from 'react-router-dom';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Badge } from '@components/badge';
import { ExitIcon } from '@components/icons/exit-icon';
import { Logo } from '@components/logo';
import { ErrorModal } from '@components/modals/error-modal';
import PATHS from '@constants/paths';
import { useGetLazyTraining } from '@hooks/use-get-training';
import { useLogout } from '@hooks/use-logout';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { setIsCollapsed } from '@redux/sider/sider-slice';
import { Button, Layout, Menu } from 'antd';

import styles from './sidebar.module.scss';

const { Sider } = Layout;

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const matches = useMediaQuery({ query: '(max-width: 768px)' });
    const [collapsed, setCollapsed] = useState(matches);

    const inviteCount = useAppSelector((state) => state.invite);

    const { onGetTraining, closeErrorModal, isErrorModalOpen } = useGetLazyTraining();
    const logout = useLogout();

    useEffect(() => {
        if (matches) {
            dispatch(setIsCollapsed(true));
            setCollapsed(true);
        }
    }, [matches, dispatch]);

    const menuItems = [
        {
            key: PATHS.CALENDAR,
            icon: <CalendarTwoTone style={{ fontSize: '16px' }} />,
            label: 'Календарь',
            onClick: () => onGetTraining(PATHS.CALENDAR),
        },
        {
            key: PATHS.TRAININGS,
            icon: (
                <div className={styles.icon_badge} data-test-id='notification-about-joint-training'>
                    <Badge count={inviteCount}>
                        <HeartFilled style={{ fontSize: '16px' }} />
                    </Badge>
                </div>
            ),
            label: 'Тренировки',
            onClick: () => onGetTraining(PATHS.TRAININGS),
        },
        {
            key: PATHS.ACHIEVEMENTS,
            icon: <TrophyFilled style={{ fontSize: '16px' }} />,
            label: <span data-test-id='sidebar-achievements'>Достижения</span>,
            onClick: () => onGetTraining(PATHS.ACHIEVEMENTS),
        },
        {
            key: PATHS.PROFILE,
            icon: (
                <IdcardOutlined
                    style={{
                        fontSize: '16px',
                        transform: 'scaleX(0.8)',
                    }}
                />
            ),
            label: <NavLink to={PATHS.PROFILE}>Профиль</NavLink>,
        },
    ];

    const onCollapse = () => {
        setCollapsed(!collapsed);
        dispatch(setIsCollapsed(!collapsed));
    };

    const onExit = () => {
        logout();
    };

    return (
        <Sider
            width={matches ? 106 : 208}
            collapsible={true}
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
                    selectedKeys={[location.pathname]}
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
                    onClick={onCollapse}
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

            <Button type='text' className={styles.exit} size='large' onClick={onExit}>
                {!matches && <ExitIcon />}
                {!collapsed && 'Выход'}
            </Button>

            <ErrorModal isModalOpen={isErrorModalOpen} onClose={closeErrorModal} />
        </Sider>
    );
};
