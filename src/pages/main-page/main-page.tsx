import React from 'react';
import { push } from 'redux-first-history';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Header } from '@components/header';
import { ErrorModal } from '@components/modals/error-modal';
import PATHS from '@constants/paths';
import { useGetLazyTraining } from '@hooks/use-get-training';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Card, Col, Layout, Row } from 'antd';

import { Footer } from './footer';

import styles from './main-page.module.scss';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { onGetTraining, closeErrorModal, isErrorModalOpen } = useGetLazyTraining();

    return (
        <Layout className={styles.main_container}>
            <Header
                title={
                    <React.Fragment>
                        Приветствуем тебя в&nbsp;CleverFit&nbsp;— приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </React.Fragment>
                }
                breadCrumbs={[{ title: 'Главная', link: PATHS.MAIN }]}
            />
            <Content className={styles.main_content}>
                <Layout className={styles.grid_container}>
                    <Row gutter={[16, 24]}>
                        <Col span={24}>
                            <Card className={styles.card_actions}>
                                <p className={styles.card_text}>
                                    С&nbsp;CleverFit ты&nbsp;сможешь:
                                    <br />— планировать свои тренировки на&nbsp;календаре, выбирая
                                    тип и&nbsp;уровень нагрузки;
                                    <br />— отслеживать свои достижения в&nbsp;разделе статистики,
                                    сравнивая свои результаты с&nbsp;нормами и&nbsp;рекордами;
                                    <br />— создавать свой профиль, где ты&nbsp;можешь загружать
                                    свои фото, видео и&nbsp;отзывы о&nbsp;тренировках;
                                    <br />— выполнять расписанные тренировки для разных частей тела,
                                    следуя подробным инструкциям и&nbsp;советам профессиональных
                                    тренеров.
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
                                    <Row gutter={[16, 8]} justify='space-between'>
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
                                                        <HeartFilled style={{ fontSize: '12px' }} />
                                                    }
                                                    block={true}
                                                    className={styles.card_button}
                                                    onClick={() => onGetTraining(PATHS.TRAININGS)}
                                                    data-test-id='menu-button-training'
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
                                                            twoToneColor={['#2F54EB', '#2F54EB']}
                                                            style={{ fontSize: '12px' }}
                                                        />
                                                    }
                                                    block={true}
                                                    className={styles.card_button}
                                                    onClick={() => onGetTraining(PATHS.CALENDAR)}
                                                    data-test-id='menu-button-calendar'
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
                                                    block={true}
                                                    className={styles.card_button}
                                                    onClick={() => dispatch(push(PATHS.PROFILE))}
                                                    data-test-id='menu-button-profile'
                                                >
                                                    Профиль
                                                </Button>
                                            </Card>
                                        </Col>
                                        <ErrorModal
                                            isModalOpen={isErrorModalOpen}
                                            onClose={closeErrorModal}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Layout>
                <Footer />
            </Content>
        </Layout>
    );
};
