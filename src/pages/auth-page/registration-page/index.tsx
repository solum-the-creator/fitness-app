import { Button, Form, Input } from 'antd';
import styles from './registration-page.module.scss';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '@redux/api/apiSlice';
import { useAppDispatch } from '@redux/configure-store';
import { push } from 'redux-first-history';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

type RegistrationFormValues = {
    email: string;
    password: string;
    confirm: string;
};

export const RegistrationPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const isRepeat: boolean = location.state?.fromResult;
    const repeatValues = location.state?.formValues as RegistrationFormValues;

    const onFinish = useCallback(
        async (values: RegistrationFormValues) => {
            try {
                await register(values).unwrap();
                dispatch(push('/result/success', { fromResult: true }));
            } catch (error) {
                const registerError = error as FetchBaseQueryError;
                if (registerError.status === 409) {
                    dispatch(push('/result/error-user-exist', { fromResult: true }));
                    return;
                }

                dispatch(push('/result/error', { fromResult: true, formValues: values }));
            }
        },
        [register, dispatch],
    );

    useEffect(() => {
        if (isRepeat) {
            onFinish(repeatValues);
        }
    }, [isRepeat, onFinish, repeatValues]);

    return (
        <Form
            name='registration'
            size='large'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            className={styles.form}
        >
            <Form.Item
                name={'email'}
                rules={[{ required: true }, { type: 'email' }]}
                className={styles.form_item_email}
            >
                <Input addonBefore={'e-mail:'} placeholder='' />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[{ required: true }, { min: 8 }]}
                className={styles.form_item_password}
                extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            >
                <Input.Password placeholder='Пароль'></Input.Password>
            </Form.Item>
            <Form.Item
                name={'confirm'}
                dependencies={['password']}
                rules={[{ required: true }]}
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
                    disabled={isLoading}
                >
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
