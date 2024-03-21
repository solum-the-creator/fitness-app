import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { DatePicker, Form, Input, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { Header } from './header';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
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
                                    <Upload.Dragger className={styles.upload_dragger}>
                                        <p className='upload-drag-icon'>
                                            <PlusOutlined style={{ fontSize: 14, color: '#000' }} />
                                        </p>
                                        <p className='ant-upload-text'>Загрузить фото профиля</p>
                                    </Upload.Dragger>
                                </Form.Item>
                                <div className={styles.inputs}>
                                    <Form.Item name='first_name' noStyle={true}>
                                        <Input type='text' placeholder='Имя' />
                                    </Form.Item>
                                    <Form.Item name='second_name' noStyle={true}>
                                        <Input type='text' placeholder='Фамилия' />
                                    </Form.Item>
                                    <Form.Item name='birthday' noStyle={true}>
                                        <DatePicker placeholder='Дата рождения' />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </Content>
        </div>
    );
};
