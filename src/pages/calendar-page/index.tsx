import styles from './calendar-page.module.scss';

import { BaseHeader } from '@components/header/base-header';
import PATHS from '@constants/paths';

import { Content } from 'antd/lib/layout/layout';
import { useMediaQuery } from 'react-responsive';

import { Calendar } from 'antd';

import { RU_CALENDAR_LOCALE } from '@constants/constants';

export const CalendarPage = () => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });

    return (
        <div className={styles.main_container}>
            <BaseHeader
                breadCrumbs={[
                    { title: 'Главная', link: PATHS.MAIN },
                    { title: 'Календарь', link: PATHS.CALENDAR },
                ]}
            />
            <Content className={styles.content}>
                <div className={styles.calendar_container}>
                    <Calendar
                        className={styles.calendar}
                        locale={RU_CALENDAR_LOCALE}
                        fullscreen={!matches}
                    />
                </div>
            </Content>
        </div>
    );
};
