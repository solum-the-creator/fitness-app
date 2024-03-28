import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import { GooglePlusOutlined } from '@ant-design/icons';
import { STATUS_CODE } from '@constants/constants';
import PATHS, { PATHS_RESULT } from '@constants/paths';
import { validatePasswordLength } from '@constants/validation';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { BASE_API_URL, useCheckEmailMutation, useLoginMutation } from '@redux/api/api-slice';
import { setCredentials } from '@redux/auth/auth-slice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Button, Checkbox, Form, Input, InputRef } from 'antd';

import styles from './styles/auth-page.module.scss';

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
            dispatch(push(PATHS.MAIN));
        } catch (error) {
            dispatch(push(PATHS_RESULT.ERROR_LOGIN, { fromResult: true }));
        }
    };

    const onForgotPassword = useCallback(async () => {
        const email = (form.getFieldValue('email') || repeatEmail) as string;

        if (email) {
            try {
                await checkEmail(email).unwrap();

                dispatch(push(PATHS.CONFIRM_EMAIL, { fromResult: true, email }));
            } catch (error) {
                const checkEmailError = error as FetchBaseQueryError;
                const errorData = checkEmailError.data as {
                    message: string;
                    error: string;
                    statusCode: number;
                };

                if (
                    checkEmailError.status === STATUS_CODE.NOT_FOUND &&
                    errorData.message === 'Email не найден'
                ) {
                    dispatch(push(PATHS_RESULT.ERROR_CHECK_EMAIL_NO_EXIST, { fromResult: true }));

                    return;
                }
                dispatch(push(PATHS_RESULT.ERROR_CHECK_EMAIL, { fromResult: true, email }));
            }
        } else {
            inputRef.current?.focus();
        }
    }, [checkEmail, dispatch, form, inputRef, repeatEmail]);

    const onLoginGoogle = () => {
        window.location.href = `${BASE_API_URL}${PATHS.GOOGLE_AUTH}`;
    };

    useEffect(() => {
        if (isFromErrorCheckEmail) {
            onForgotPassword();
        }
    }, [isFromErrorCheckEmail, onForgotPassword]);

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
                name='email'
                rules={[
                    { required: true, message: 'Обязательное поле' },
                    { type: 'email', message: 'Неверный формат почты' },
                ]}
                className={styles.form_item_email}
            >
                <Input
                    ref={inputRef}
                    addonBefore='e-mail:'
                    placeholder=''
                    data-test-id='login-email'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[{ required: true, message: '' }, validatePasswordLength]}
                className={styles.form_item_password}
            >
                <Input.Password placeholder='Пароль' data-test-id='login-password' />
            </Form.Item>
            <Form.Item className={styles.form_check_area}>
                <Form.Item name='remember' valuePropName='checked' className={styles.form_remember}>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>

                <div className={styles.link_container}>
                    <Form.Item shouldUpdate={true}>
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
                    block={true}
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
                    block={true}
                    onClick={onLoginGoogle}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
