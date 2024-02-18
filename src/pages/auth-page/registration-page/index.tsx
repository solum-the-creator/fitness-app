import { Button, Checkbox, Form, Input } from 'antd';
import styles from './registration-page.module.scss';
import { Link } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';

export const RegistrationPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name='registration'
            size='large'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            className={styles.form}
        >
            <Form.Item
                name={'e-mail'}
                rules={[{ required: true }, { type: 'email' }]}
                className={styles.form_item_email}
            >
                <Input addonBefore={'e-mail:'} placeholder='' />
            </Form.Item>
            <Form.Item
                name={'password'}
                required={true}
                className={styles.form_item_password}
                extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            >
                <Input.Password placeholder='Пароль'></Input.Password>
            </Form.Item>
            <Form.Item
                name={'confirm'}
                dependencies={['password']}
                required={true}
                className={styles.form_item_confirm_password}
            >
                <Input.Password placeholder='Повторите пароль'></Input.Password>
            </Form.Item>

            <Form.Item className={styles.form_button_submit}>
                <Button type='primary' htmlType='submit' block>
                    Войти
                </Button>
            </Form.Item>
            <Form.Item className={styles.form_button_google}>
                <Button
                    type='default'
                    icon={<GooglePlusOutlined style={{ fontSize: '14px' }} />}
                    htmlType='submit'
                    block
                >
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
