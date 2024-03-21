import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { RU_CALENDAR_LOCALE } from '@constants/constants';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { Header } from './header';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
    const matches = useMediaQuery({ query: '(max-width: 480px)' });
    const user = useAppSelector(userSelector);

    console.log(user);

    return (
        <div className={styles.main_container}>
            <Header title='Профиль' />
            <Content className={styles.content_container}>
                <div className={styles.content}>
                    <Form layout='vertical' className={styles.form} size='large'>
                        <div className={styles.form_section}>
                            <h2 className={styles.form_subtitle}>Личная информация</h2>
                            <div className={styles.personal_info}>
                                <Form.Item name='image' noStyle={true}>
                                    {matches ? (
                                        <Upload
                                            action=''
                                            listType='picture'
                                            className={styles.upload}
                                        >
                                            <span className={styles.upload_label}>
                                                Загрузить&nbsp;фото&nbsp;профиля:
                                            </span>
                                            <Button icon={<UploadOutlined />} block={true}>
                                                Загрузить
                                            </Button>
                                        </Upload>
                                    ) : (
                                        <Upload.Dragger className={styles.upload_dragger}>
                                            <p className='upload-drag-icon'>
                                                <PlusOutlined
                                                    style={{ fontSize: 14, color: '#000' }}
                                                />
                                            </p>
                                            <p className='ant-upload-text'>
                                                Загрузить фото профиля
                                            </p>
                                        </Upload.Dragger>
                                    )}
                                </Form.Item>
                                <div className={styles.inputs}>
                                    <Form.Item name='first_name' noStyle={true}>
                                        <Input
                                            type='text'
                                            placeholder='Имя'
                                            className={styles.form_input}
                                        />
                                    </Form.Item>
                                    <Form.Item name='second_name' noStyle={true}>
                                        <Input
                                            type='text'
                                            placeholder='Фамилия'
                                            className={styles.form_input}
                                        />
                                    </Form.Item>
                                    <Form.Item name='birthday' noStyle={true}>
                                        <DatePicker
                                            placeholder='Дата рождения'
                                            className={styles.form_input}
                                            locale={RU_CALENDAR_LOCALE}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.form_section} ${styles.private_info_section}`}>
                            <h2 className={styles.form_subtitle}>Приватность и авторизация</h2>
                            <div className={styles.private_info}>
                                <Form.Item name='email' className={styles.form_item_email}>
                                    <Input
                                        addonBefore='e-mail:'
                                        placeholder=''
                                        className={styles.form_input}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='password'
                                    className={styles.form_item_password}
                                    help={
                                        <React.Fragment>
                                            Пароль не менее 8 символов, с заглавной буквой
                                            и&nbsp;цифрой
                                        </React.Fragment>
                                    }
                                >
                                    <Input.Password
                                        placeholder='Пароль'
                                        className={styles.form_input}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='confirm'
                                    dependencies={['password']}
                                    className={styles.form_item_confirm_password}
                                >
                                    <Input.Password
                                        placeholder='Повторите пароль'
                                        className={styles.form_input}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item shouldUpdate={true}>
                            {() => (
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className={styles.form_button_submit}
                                    block={matches}
                                >
                                    Сохранить изменения
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </div>
    );
};
