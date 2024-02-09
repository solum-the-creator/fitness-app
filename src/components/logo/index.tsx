import { Image } from 'antd';

import logo from '/logo.svg';
import logoCollapsed from '/fitLogo.svg';

import styles from './logo.module.scss';

interface LogoProps {
    collapsed: boolean;
}

export const Logo = ({ collapsed }: LogoProps) => {
    const logoUrl = collapsed ? logoCollapsed : logo;
    const styleClass = collapsed ? styles.logo_collapsed : styles.logo;
    return (
        <div className={styleClass}>
            <Image alt='CleverFit' preview={false} src={logoUrl} />
        </div>
    );
};
