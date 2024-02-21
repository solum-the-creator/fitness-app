import styles from './chage-password.module.scss';

import { Button, Form, Input, Typography } from 'antd';
import { Wrapper } from '../_components/result/wrapper';
import { Rule } from 'antd/lib/form';

type ChangePasswordForm = {
    password: string;
    repeatPassword: string;
};

export const ChangePasswordPage = () => {
    const [form] = Form.useForm();
    const onFinish = (values: ChangePasswordForm) => {
        console.log(values);
    };

    const validatePassword: Rule = () => ({
        validator(_, value: string) {
            if (!/(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/.test(value)) {
                return Promise.reject('');
            } else {
                return Promise.resolve();
            }
        },
    });

    const validateConfirm: Rule = ({ getFieldValue }) => ({
        validator(_, value: string) {
            if (value !== getFieldValue('password')) {
                return Promise.reject('Пароли не совпадают');
            } else {
                return Promise.resolve();
            }
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
                        name={'password'}
                        rules={[{ required: true }, { min: 8, message: '' }, validatePassword]}
                        className={styles.form_item_password}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password placeholder='Пароль' />
                    </Form.Item>
                    <Form.Item
                        name={'confirm'}
                        dependencies={['password']}
                        rules={[{ required: true, message: '' }, validateConfirm]}
                        className={styles.form_item_confirm_password}
                    >
                        <Input.Password placeholder='Повторите пароль' />
                    </Form.Item>
                    <Form.Item shouldUpdate className={styles.form_button_submit}>
                        {() => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
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
