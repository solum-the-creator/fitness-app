import { Link } from 'react-router-dom';
import styles from './styles/auth-page.module.scss';
import { GooglePlusOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input } from 'antd';
import { useLoginMutation } from '@redux/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@redux/auth/authSlice';
import { push } from 'redux-first-history';
import { useLoaderLoading } from '@hooks/use-loader-loading';

type LoginFormValues = {
    email: string;
    password: string;
    remember?: boolean;
};

export const AuthPage = () => {
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    useLoaderLoading(isLoading);

    const onFinish = async (values: LoginFormValues) => {
        try {
            const loginData = await login(values).unwrap();

            dispatch(setCredentials(loginData));
            if (values.remember) {
                localStorage.setItem('authToken', loginData.accessToken);
            }
            dispatch(push('/main'));
        } catch (error) {
            dispatch(push('/result/error-login', { fromResult: true }));
        }
    };

    return (
        <Form
            name='auth'
            size='large'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className={styles.form}
        >
            <Form.Item
                name={'email'}
                rules={[{ required: true, message: '' }, { type: 'email' }]}
                className={styles.form_item_email}
            >
                <Input addonBefore={'e-mail:'} placeholder='' data-test-id='login-email' />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[{ required: true, message: '' }]}
                className={styles.form_item_password}
            >
                <Input.Password placeholder='Пароль' data-test-id='login-password' />
            </Form.Item>
            <Form.Item className={styles.form_check_area}>
                <Form.Item
                    name={'remember'}
                    valuePropName='checked'
                    className={styles.form_remember}
                >
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>

                <div className={styles.link_container}>
                    <Link
                        to={'/auth/change-password'}
                        className={styles.link_forgot}
                        data-test-id='login-forgot-button'
                    >
                        Забыли пароль?
                    </Link>
                </div>
            </Form.Item>
            <Form.Item className={styles.form_button_submit}>
                <Button
                    type='primary'
                    htmlType='submit'
                    block
                    disabled={isLoading}
                    data-test-id='login-submit-button'
                >
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
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
