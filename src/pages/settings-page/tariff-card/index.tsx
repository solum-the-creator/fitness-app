import { useMediaQuery } from 'react-responsive';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

import styles from './tariff-card.module.scss';

type TariffCardProps = {
    title: string;
    isActive?: boolean;
    activeDate?: string;
    imageSrc: string;
    disabledImageSrc?: string;
};

export const TariffCard = ({
    title,
    isActive,
    activeDate,
    imageSrc,
    disabledImageSrc,
}: TariffCardProps) => {
    const matches = useMediaQuery({ query: '(max-width: 600px)' });

    const activeUntill = activeDate ? (
        <span className={styles.active_date}>до 02.07</span>
    ) : (
        <CheckOutlined />
    );
    const activeSpan = <span className={styles.active_span}>активен {activeUntill}</span>;

    return (
        <Card
            title={title}
            className={styles.tariff_card}
            style={{ width: matches ? '100%' : '240px' }}
            cover={<img alt={title} src={isActive ? imageSrc : disabledImageSrc} />}
            extra={
                <Button type='link' size='small' className={styles.button_more}>
                    Подробнее
                </Button>
            }
        >
            <div className={styles.body_wrapper}>
                {isActive ? (
                    activeSpan
                ) : (
                    <Button type='primary' size='large'>
                        Активировать
                    </Button>
                )}
            </div>
        </Card>
    );
};
