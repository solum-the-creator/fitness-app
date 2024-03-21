import { SettingsButton } from '@components/buttons/settings-button';

import styles from './header.module.scss';

type HeaderProps = {
    title: string;
};

export const Header = ({ title }: HeaderProps) => (
    <header className={styles.header}>
        <h1 className={styles.header_title}>{title}</h1>
        <div className={styles.button_container}>
            <SettingsButton />
        </div>
    </header>
);
