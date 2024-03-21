import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { push, replace } from 'redux-first-history';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useChangePasswordMutation } from '@redux/api/api-slice';
import { useAppDispatch } from '@redux/configure-store';
import { Button, Form, Input, Typography } from 'antd';
import { Rule } from 'antd/lib/form';

import { Wrapper } from '../_components/result/wrapper';

import styles from './chage-password.module.scss';

type ChangePasswordForm = {
    password: string;
    confirmPassword: string;
};

export const ChangePasswordPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    useLoaderLoading(isLoading);

    const isRepeat = location.state?.isRepeat as boolean;
    const repeatValues = location.state?.formValues as ChangePasswordForm;

    const onFinish = useCallback(
        async (values: ChangePasswordForm) => {
            try {
                await changePassword(values).unwrap();
                dispatch(replace('/result/success-change-password', { fromResult: true }));
            } catch (error) {
                dispatch(
                    push('/result/error-change-password', { fromResult: true, formValues: values }),
                );
            }
        },
        [changePassword, dispatch],
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
        <Wrapper>
            <div className={styles.form_wrapper}>
                <Typography.Title level={3} className={styles.title}>
                    Восстановление аккауанта
                </Typography.Title>
                <Form
                    name='change-password'
                    size='large'
                    onFinish={onFinish}
                    className={styles.form}
                    form={form}
                >
                    <Form.Item
                        name='password'
                        rules={[{ required: true }, { min: 8, message: '' }, validatePassword]}
                        className={styles.form_item_password}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password placeholder='Пароль' data-test-id='change-password' />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        dependencies={['password']}
                        rules={[{ required: true, message: '' }, validateConfirm]}
                        className={styles.form_item_confirm_password}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='change-confirm-password'
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate={true} className={styles.form_button_submit}>
                        {() => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                block={true}
                                data-test-id='change-submit-button'
                                disabled={
                                    form.getFieldsError().filter(({ errors }) => errors.length)
                                        .length > 0
                                }
                            >
                                Сохранить
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </Wrapper>
    );
};
