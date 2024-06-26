import { useMediaQuery } from 'react-responsive';
import { CheckOutlined } from '@ant-design/icons';
import { DATE_SHORT_FORMAT } from '@constants/constants';
import { Button, Card } from 'antd';
import moment from 'moment';

import styles from './tariff-card.module.scss';

type TariffCardProps = {
    title: string;
    imageSrc: string;
    onMoreClick: () => void;
    isActive?: boolean;
    activeDate?: string;
    disabledImageSrc?: string;
    testId?: string;
};

export const TariffCard = ({
    title,
    isActive,
    activeDate,
    imageSrc,
    disabledImageSrc,
    testId,
    onMoreClick,
}: TariffCardProps) => {
    const matches = useMediaQuery({ query: '(max-width: 600px)' });

    const formattedDate = activeDate && moment(activeDate).format(DATE_SHORT_FORMAT);

    const activeUntill = activeDate ? (
        <span className={styles.active_date}>до {formattedDate}</span>
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
                <Button
                    type='link'
                    size='small'
                    className={styles.button_more}
                    onClick={onMoreClick}
                >
                    Подробнее
                </Button>
            }
            data-test-id={testId}
        >
            <div className={styles.body_wrapper}>
                {isActive ? (
                    activeSpan
                ) : (
                    <Button
                        type='primary'
                        size='large'
                        data-test-id='activate-tariff-btn'
                        onClick={onMoreClick}
                    >
                        Активировать
                    </Button>
                )}
            </div>
        </Card>
    );
};
