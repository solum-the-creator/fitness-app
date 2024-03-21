import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import { GooglePlusOutlined } from '@ant-design/icons';
import { STATUS_CODE } from '@constants/constants';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useRegisterMutation } from '@redux/api/apiSlice';
import { useAppDispatch } from '@redux/configure-store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';

import styles from './registration-page.module.scss';

type RegistrationFormValues = {
    email: string;
    password: string;
    confirm: string;
};

export const RegistrationPage = () => {
    const [form] = Form.useForm<RegistrationFormValues>();

    const location = useLocation();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    useLoaderLoading(isLoading);

    const isRepeat: boolean = location.state?.fromResult;
    const repeatValues = location.state?.formValues as RegistrationFormValues;

    const onFinish = useCallback(
        async (values: RegistrationFormValues) => {
            try {
                await register(values).unwrap();
                dispatch(push('/result/success', { fromResult: true }));
            } catch (error) {
                const registerError = error as FetchBaseQueryError;

                if (registerError.status === STATUS_CODE.CONFLICT) {
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

    const validatePassword: Rule = () => ({
        validator(_, value: string) {
            if (!/(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/.test(value)) {
                return Promise.reject(new Error(''));
            }

            return Promise.resolve();
        },
    });

    const validateConfirm: Rule = ({ getFieldValue }) => ({
        validator(_, value: string) {
            if (value !== getFieldValue('password')) {
                return Promise.reject(new Error('Пароли не совпадают'));
            }

            return Promise.resolve();
        },
    });

    return (
        <Form
            name='registration'
            size='large'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            className={styles.form}
            form={form}
        >
            <Form.Item
                name='email'
                rules={[
                    { required: true, message: '' },
                    { type: 'email', message: '' },
                ]}
                className={styles.form_item_email}
            >
                <Input addonBefore='e-mail:' placeholder='' data-test-id='registration-email' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[{ required: true }, { min: 8, message: '' }, validatePassword]}
                className={styles.form_item_password}
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            >
                <Input.Password placeholder='Пароль' data-test-id='registration-password' />
            </Form.Item>
            <Form.Item
                name='confirm'
                dependencies={['password']}
                rules={[{ required: true, message: '' }, validateConfirm]}
                className={styles.form_item_confirm_password}
            >
                <Input.Password
                    placeholder='Повторите пароль'
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>

            <Form.Item shouldUpdate={true} className={styles.form_button_submit}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        block={true}
                        data-test-id='registration-submit-button'
                        disabled={
                            form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                        }
                    >
                        Войти
                    </Button>
                )}
            </Form.Item>
            <Form.Item className={styles.form_button_google}>
                <Button
                    type='default'
                    icon={<GooglePlusOutlined style={{ fontSize: '14px' }} />}
                    htmlType='submit'
                    block={true}
                    disabled={isLoading}
                >
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
