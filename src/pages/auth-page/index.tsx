import styles from './styles/auth-page.module.scss';
import { GooglePlusOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input, InputRef } from 'antd';
import { BASE_API_URL, useCheckEmailMutation, useLoginMutation } from '@redux/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@redux/auth/authSlice';
import { push } from 'redux-first-history';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { Rule } from 'antd/lib/form';
import { useCallback, useEffect, useRef } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useLocation } from 'react-router-dom';

type LoginFormValues = {
    email: string;
    password: string;
    remember?: boolean;
};

export const AuthPage = () => {
    const inputRef = useRef<InputRef>(null);
    const [form] = Form.useForm<LoginFormValues>();
    const dispatch = useDispatch();
    const location = useLocation();

    const [login, { isLoading: isLoadingAuth }] = useLoginMutation();
    const [checkEmail, { isLoading: isLoadingCheckEmail }] = useCheckEmailMutation();

    const isLoading = isLoadingAuth || isLoadingCheckEmail;
    useLoaderLoading(isLoading);

    const isFromErrorCheckEmail = location.state?.fromErrorCheckEmail as boolean;
    const repeatEmail = location.state?.email as string;

    const onFinish = async (values: LoginFormValues) => {
        try {
            const loginData = await login({
                email: values.email,
                password: values.password,
            }).unwrap();

            dispatch(setCredentials(loginData));
            if (values.remember) {
                localStorage.setItem('authToken', loginData.accessToken);
            }
            dispatch(push('/main'));
        } catch (error) {
            dispatch(push('/result/error-login', { fromResult: true }));
        }
    };

    const onForgotPassword = useCallback(async () => {
        const email = (form.getFieldValue('email') || repeatEmail) as string;

        if (!email) {
            inputRef.current?.focus();
        } else {
            try {
                await checkEmail(email).unwrap();

                dispatch(push('/auth/confirm-email', { fromResult: true, email: email }));
            } catch (error) {
                console.log(error);
                const checkEmailError = error as FetchBaseQueryError;
                const errorData = checkEmailError.data as {
                    message: string;
                    error: string;
                    statusCode: number;
                };
                if (checkEmailError.status === 404 && errorData.message === 'Email не найден') {
                    dispatch(push('/result/error-check-email-no-exist', { fromResult: true }));
                    return;
                }
                dispatch(push('/result/error-check-email', { fromResult: true, email: email }));
            }
        }
    }, [checkEmail, dispatch, form, inputRef, repeatEmail]);

    const onLoginGoogle = () => {
        window.location.href = `${BASE_API_URL}auth/google`;
    };

    useEffect(() => {
        if (isFromErrorCheckEmail) {
            onForgotPassword();
        }
    }, [isFromErrorCheckEmail, onForgotPassword]);

    const validatePassword: Rule = () => ({
        validator(_, value: string) {
            if (value.length < 8 || !/(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/.test(value)) {
                return Promise.reject('Пароль не менее 8 символов, с заглавной буквой и цифрой');
            } else {
                return Promise.resolve();
            }
        },
    });

    return (
        <Form
            name='auth'
            size='large'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            className={styles.form}
            form={form}
        >
            <Form.Item
                name={'email'}
                rules={[
                    { required: true, message: 'Обязательное поле' },
                    { type: 'email', message: 'Неверный формат почты' },
                ]}
                className={styles.form_item_email}
            >
                <Input
                    ref={inputRef}
                    addonBefore={'e-mail:'}
                    placeholder=''
                    data-test-id='login-email'
                />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[{ required: true, message: '' }, validatePassword]}
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
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type='link'
                                size='small'
                                className={styles.link_forgot}
                                data-test-id='login-forgot-button'
                                onClick={onForgotPassword}
                                disabled={form.getFieldError('email').length > 0}
                            >
                                Забыли пароль?
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form.Item>
            <Form.Item className={styles.form_button_submit}>
                <Button
                    type='primary'
                    htmlType='submit'
                    block
                    data-test-id='login-submit-button'
                    disabled={isLoading}
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item className={styles.form_button_google}>
                <Button
                    type='default'
                    icon={<GooglePlusOutlined style={{ fontSize: '14px' }} />}
                    htmlType='button'
                    block
                    onClick={onLoginGoogle}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
