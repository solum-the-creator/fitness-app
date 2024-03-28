import { Link } from 'react-router-dom';
import PATHS from '@constants/paths';
import { Image } from 'antd';

import styles from './logo.module.scss';

import logoCollapsed from '/fitLogo.svg';
import logo from '/logo.svg';

type LogoProps = {
    collapsed: boolean;
    matches?: boolean;
};

export const Logo = ({ collapsed, matches }: LogoProps) => {
    const logoUrl = collapsed && !matches ? logoCollapsed : logo;
    const styleClass = collapsed ? styles.logo_collapsed : styles.logo;

    return (
        <Link to={PATHS.ROOT}>
            <div className={`${styleClass}`}>
                <Image alt='CleverFit' preview={false} src={logoUrl} />
            </div>
        </Link>
    );
};
