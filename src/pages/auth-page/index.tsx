import { Link } from 'react-router-dom';
import styles from './auth-page.module.scss';
import { GooglePlusOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input } from 'antd';

export const AuthPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name='auth'
            size='large'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className={styles.form}
        >
            <Form.Item name={'e-mail'} required={true} className={styles.form_item_email}>
                <Input addonBefore={'e-mail:'} placeholder='' />
            </Form.Item>
            <Form.Item name={'password'} required={true} className={styles.form_item_password}>
                <Input.Password placeholder='Пароль'></Input.Password>
            </Form.Item>
            <Form.Item className={styles.form_check_area}>
                <Form.Item
                    name={'remember'}
                    valuePropName='checked'
                    className={styles.form_remember}
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <div className={styles.link_container}>
                    <Link to={'/auth/change-password'} className={styles.link_forgot}>
                        Забыли пароль?
                    </Link>
                </div>
            </Form.Item>
            <Form.Item className={styles.form_button_submit}>
                <Button type='primary' htmlType='submit' block>
                    Войти
                </Button>
            </Form.Item>
            <Form.Item className={styles.form_button_google}>
                <Button type='default' icon={<GooglePlusOutlined />} htmlType='submit' block>
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
