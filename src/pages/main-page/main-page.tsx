import React from 'react';

import { Button, Card, Col, Layout, Row } from 'antd';
import { Sidebar } from '@components/sidebar';
import { Header } from '@components/header';

import styles from './main-page.module.scss';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Footer } from './footer';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <Layout hasSider style={{ height: '100%' }} className={styles.image_container}>
            <Sidebar />

            <Layout className={styles.main_container}>
                <Header />
                <Content className={styles.main_content}>
                    <Layout className={styles.grid_container}>
                        <Row gutter={[16, 24]}>
                            <Col span={24}>
                                <Card className={styles.card_actions}>
                                    <p>
                                        С&nbsp;CleverFit ты&nbsp;сможешь:
                                        <br />— планировать свои тренировки на&nbsp;календаре,
                                        выбирая тип и&nbsp;уровень нагрузки;
                                        <br />— отслеживать свои достижения в&nbsp;разделе
                                        статистики, сравнивая свои результаты с&nbsp;нормами
                                        и&nbsp;рекордами;
                                        <br />— создавать свой профиль, где ты&nbsp;можешь загружать
                                        свои фото, видео и&nbsp;отзывы о&nbsp;тренировках;
                                        <br />— выполнять расписанные тренировки для разных частей
                                        тела, следуя подробным инструкциям и&nbsp;советам
                                        профессиональных тренеров.
                                    </p>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} span={24}>
                                        <Card bordered={false} className={styles.card_info}>
                                            <p className={styles.card_description}>
                                                CleverFit&nbsp;— это не&nbsp;просто приложение,
                                                а&nbsp;твой личный помощник в&nbsp;мире фитнеса.
                                                Не&nbsp;откладывай на&nbsp;завтра&nbsp;— начни
                                                тренироваться уже сегодня!
                                            </p>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[16, 8]} justify={'space-between'}>
                                            <Col xs={24} sm={8} span={8}>
                                                <Card
                                                    title='Расписать тренировки'
                                                    bordered={false}
                                                    bodyStyle={{
                                                        padding: '12px 0',
                                                    }}
                                                    headStyle={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        type='link'
                                                        icon={
                                                            <HeartFilled
                                                                style={{ fontSize: '12px' }}
                                                            />
                                                        }
                                                        block
                                                        className={styles.card_button}
                                                    >
                                                        Тренировки
                                                    </Button>
                                                </Card>
                                            </Col>
                                            <Col xs={24} sm={8} span={8}>
                                                <Card
                                                    title='Назначить календарь'
                                                    bordered={false}
                                                    bodyStyle={{
                                                        padding: '12px 0',
                                                    }}
                                                    headStyle={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        type='link'
                                                        icon={
                                                            <CalendarTwoTone
                                                                twoToneColor={[
                                                                    '#2F54EB',
                                                                    '#2F54EB',
                                                                ]}
                                                                style={{ fontSize: '12px' }}
                                                            />
                                                        }
                                                        block
                                                        className={styles.card_button}
                                                    >
                                                        Календарь
                                                    </Button>
                                                </Card>
                                            </Col>
                                            <Col xs={24} sm={8} span={8}>
                                                <Card
                                                    title='Заполнить профиль'
                                                    bordered={false}
                                                    bodyStyle={{
                                                        padding: '12px 0',
                                                    }}
                                                    headStyle={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        type='link'
                                                        icon={
                                                            <IdcardOutlined
                                                                style={{
                                                                    fontSize: '12px',
                                                                    transform: 'scaleX(0.8)',
                                                                }}
                                                            />
                                                        }
                                                        block
                                                        className={styles.card_button}
                                                    >
                                                        Профиль
                                                    </Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Layout>
                    <Footer />
                </Content>
            </Layout>
        </Layout>
    );
};
