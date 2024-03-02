import { Button, Form, Modal, Rate } from 'antd';
import styles from './feedback-modal.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { StarTwoTone } from '@ant-design/icons';
import { useState } from 'react';

type FeedbackFormValues = {
    rating: number;
    message?: string;
};

type FeedbackModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
    onSend: (values: FeedbackFormValues) => void;
};

export const FeedbackModal = ({ isModalOpen, onClose, onSend }: FeedbackModalProps) => {
    const [form] = Form.useForm<FeedbackFormValues>();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleOnChange = (value: number) => {
        if (value) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            form.resetFields();
            onSend(values);
        } catch (error) {
            form.resetFields();
        }
    };

    return (
        <Modal
            title='Ваш отзыв'
            open={isModalOpen}
            centered
            onCancel={onClose}
            footer={
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    className={styles.button}
                    onClick={onSubmit}
                    disabled={isDisabled}
                >
                    Опубликовать
                </Button>
            }
            width={'100%'}
            className={styles.modal}
            wrapClassName={styles.wrap_modal}
            maskTransitionName=''
            transitionName=''
            maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.5)' }}
        >
            <Form name='feedback' className={styles.form} form={form}>
                <Form.Item name='rating' rules={[{ required: true }]} noStyle>
                    <Rate
                        onChange={handleOnChange}
                        character={<StarTwoTone style={{ fontSize: '24px' }} />}
                        style={{ fontSize: '24px' }}
                        className={styles.rating}
                    />
                </Form.Item>
                <Form.Item name='message' className={styles.message_item}>
                    <TextArea
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                        autoSize={{ minRows: 2 }}
                        className={styles.textarea}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
