import { Rule } from 'antd/lib/form';

export const validatePassword: Rule = () => ({
    validator(_, value: string) {
        if (/(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/.test(value)) {
            return Promise.resolve();
        }

        return Promise.reject(new Error(''));
    },
});

export const validatePasswordLength: Rule = () => ({
    validator(_, value: string) {
        if (value.length < 8 || !/(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/.test(value)) {
            return Promise.reject(
                new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой'),
            );
        }

        return Promise.resolve();
    },
});

export const validateConfirm: Rule = ({ getFieldValue }) => ({
    validator(_, value: string) {
        if (value !== getFieldValue('password')) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Пароли не совпадают'));
    },
});
