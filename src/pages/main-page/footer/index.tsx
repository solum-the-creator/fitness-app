import { Button, Card, Layout, Row, Typography } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import styles from './footer.module.scss';
import { useMediaQuery } from 'react-responsive';

import { useAppDispatch } from '@redux/configure-store';
import { push } from 'redux-first-history';
import PATHS from '@constants/paths';

const { Text, Link } = Typography;

export const Footer = () => {
    const matches = useMediaQuery({ query: `(max-width: 768px)` });
    const dispatch = useAppDispatch();

    return (
        <Layout.Footer className={styles.footer}>
            <Row justify={'space-between'} align={'bottom'} className={styles.row_container}>
                <Button
                    type='link'
                    size='large'
                    className={styles.link_button}
                    block={matches}
                    onClick={() => dispatch(push(PATHS.FEEDBACKS))}
                    data-test-id='see-reviews'
                >
                    Смотреть отзывы
                </Button>

                <Card
                    title={<CardTitle />}
                    style={matches ? { width: '100%' } : { width: '240px' }}
                    bordered={false}
                    headStyle={{ padding: '12px 24px' }}
                    bodyStyle={{
                        padding: '12px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                    className={styles.card_app}
                >
                    <Link href='/' className={styles.link_app} style={{ color: '#262626' }}>
                        <AndroidFilled />
                        Android OS
                    </Link>
                    <Link href='/' className={styles.link_app} style={{ color: '#262626' }}>
                        <AppleFilled />
                        Apple iOS
                    </Link>
                </Card>
            </Row>
        </Layout.Footer>
    );
};

const CardTitle = () => {
    return (
        <Layout className={styles.card_title}>
            <Link href='/' className={styles.link_button_title}>
                Скачать на телефон
            </Link>
            <Text type='secondary' className={styles.title_desc}>
                Доступно в PRO-тарифе
            </Text>
        </Layout>
    );
};
