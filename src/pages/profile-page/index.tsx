import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DATE_FORMAT, RU_CALENDAR_LOCALE } from '@constants/constants';
import { validateConfirm, validatePassword } from '@constants/validation';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useUpdateUserMutation } from '@redux/api/api-slice';
import { UpdateUserRequest } from '@redux/api/types';
import { useAppSelector } from '@redux/configure-store';
import { userSelector } from '@redux/user/user-slice';
import { Alert, Button, DatePicker, Form, Input } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import moment, { Moment } from 'moment';

import { ErrorModal } from './error-modal';
import { Header } from './header';
import { UploadImage } from './upload-image';

import styles from './profile-page.module.scss';

type FieldData = {
    name: string | number | Array<string | number>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
};

type ProfileFormValues = {
    firstName: string;
    lastName: string;
    birthday: Moment;
    imgSrc: string;
    email: string;
    password?: string;
    confirmPassword?: string;
};

export const ProfilePage = () => {
    const matches = useMediaQuery({ query: '(max-width: 480px)' });

    const [form] = Form.useForm<ProfileFormValues>();
    const user = useAppSelector(userSelector);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useLoaderLoading(isLoading);

    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            ...user,
            birthday: user.birthday ? moment(user.birthday) : undefined,
        });
    }, [form, user]);

    const onFieldsChange = (changedFields: FieldData[]) => {
        setIsDisabledSubmit(false);

        const imageField = changedFields.find((field) => {
            const names = field.name as string[];

            return names[0] === 'imgSrc';
        });

        if (imageField && !imageField?.value) {
            setIsDisabledSubmit(true);
        }

        const isPassword = changedFields.find((field) => {
            const names = field.name as string[];

            return names[0] === 'password' || names[0] === 'confirmPassword';
        })?.touched;

        if (isPassword) {
            setIsPasswordRequired(true);
        }
    };

    const resetPasswords = () => {
        form.resetFields(['password', 'confirmPassword']);
        setIsPasswordRequired(false);
    };

    const onFinish = async (values: ProfileFormValues) => {
        const updatedUser: UpdateUserRequest = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            imgSrc: values.imgSrc,
            birthday: values.birthday ? values.birthday.toISOString() : undefined,
        };

        try {
            await updateUser(updatedUser).unwrap();

            setIsAlertVisible(true);
            setIsDisabledSubmit(true);
            resetPasswords();
        } catch (error) {
            setIsErrorModalVisible(true);
        }
    };

    const getFile = (e: UploadChangeParam<UploadFile>) => {
        const { file } = e;

        if (file.status === 'done') {
            return file.response.url as string;
        }

        return undefined;
    };

    return (
        <div className={styles.main_container}>
            <Header title='Профиль' />
            <Content className={styles.content_container}>
                <div className={styles.content}>
                    <Form
                        layout='vertical'
                        className={styles.form}
                        size='large'
                        name='profile'
                        form={form}
                        initialValues={{
                            ...user,
                            birthday: user.birthday ? moment(user.birthday) : undefined,
                        }}
                        onFinish={onFinish}
                        onFieldsChange={onFieldsChange}
                    >
                        <div className={styles.form_section}>
                            <h2 className={styles.form_subtitle}>Личная информация</h2>
                            <div className={styles.personal_info}>
                                <UploadImage onGetValue={getFile} imageUrl={user.imgSrc} />
                                <div className={styles.inputs}>
                                    <Form.Item name='firstName' noStyle={true}>
                                        <Input
                                            type='text'
                                            placeholder='Имя'
                                            className={styles.form_input}
                                            data-test-id='profile-name'
                                        />
                                    </Form.Item>
                                    <Form.Item name='lastName' noStyle={true}>
                                        <Input
                                            type='text'
                                            placeholder='Фамилия'
                                            className={styles.form_input}
                                            data-test-id='profile-surname'
                                        />
                                    </Form.Item>
                                    <Form.Item name='birthday' noStyle={true}>
                                        <DatePicker
                                            placeholder='Дата рождения'
                                            className={styles.form_input}
                                            locale={RU_CALENDAR_LOCALE}
                                            format={DATE_FORMAT}
                                            data-test-id='profile-birthday'
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.form_section} ${styles.private_info_section}`}>
                            <h2 className={styles.form_subtitle}>Приватность и авторизация</h2>
                            <div className={styles.private_info}>
                                <Form.Item
                                    name='email'
                                    className={styles.form_item_email}
                                    rules={[
                                        { required: true, message: '' },
                                        { type: 'email', message: '' },
                                    ]}
                                >
                                    <Input
                                        addonBefore='e-mail:'
                                        placeholder=''
                                        className={styles.form_input}
                                        data-test-id='profile-email'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='password'
                                    className={styles.form_item_password}
                                    help={
                                        <React.Fragment>
                                            Пароль не менее 8 символов, с заглавной буквой
                                            и&nbsp;цифрой
                                        </React.Fragment>
                                    }
                                    rules={
                                        isPasswordRequired
                                            ? [
                                                  { required: true, message: '' },
                                                  { min: 8, message: '' },
                                                  validatePassword,
                                              ]
                                            : []
                                    }
                                >
                                    <Input.Password
                                        placeholder='Пароль'
                                        className={styles.form_input}
                                        data-test-id='profile-password'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='confirmPassword'
                                    dependencies={['password']}
                                    rules={
                                        isPasswordRequired
                                            ? [{ required: true, message: '' }, validateConfirm]
                                            : []
                                    }
                                    className={styles.form_item_confirm_password}
                                >
                                    <Input.Password
                                        placeholder='Повторите пароль'
                                        className={styles.form_input}
                                        data-test-id='profile-repeat-password'
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item shouldUpdate={true}>
                            {() => (
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className={styles.form_button_submit}
                                    block={matches}
                                    disabled={isDisabledSubmit}
                                    data-test-id='profile-submit'
                                >
                                    Сохранить изменения
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                    <ErrorModal
                        isError={isErrorModalVisible}
                        onClose={() => setIsErrorModalVisible(false)}
                    />
                    {isAlertVisible && (
                        <Alert
                            message='Данные профиля успешно обновлены'
                            showIcon={true}
                            type='success'
                            className={styles.alert}
                            closable={true}
                            onClose={() => setIsAlertVisible(false)}
                            data-test-id='alert'
                        />
                    )}
                </div>
            </Content>
        </div>
    );
};
