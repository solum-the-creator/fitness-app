import { useEffect, useRef, useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useLoaderLoading } from '@hooks/use-loader-loading';
import { useCreateFeedbackMutation } from '@redux/api/api-slice';
import { Button, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { ErrorModal } from './error-modal';
import { SuccessModal } from './success-modal';

import styles from './feedback-modal.module.scss';

type FeedbackFormValues = {
    rating: number;
    message?: string;
};

type FeedbackModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
    onShow: () => void;
};

export const FeedbackModal = ({ isModalOpen, onClose, onShow }: FeedbackModalProps) => {
    const [form] = Form.useForm<FeedbackFormValues>();
    const ratingRef = useRef<HTMLUListElement>(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

    useLoaderLoading(isLoading);

    useEffect(() => {
        if (!form.getFieldValue('rating') && isModalOpen) {
            setIsDisabled(true);
        }
    }, [isModalOpen, form]);

    const resetForm = () => {
        form.resetFields();
    };

    const handleOnChange = (value: number) => {
        if (value) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const onCancel = () => {
        resetForm();
        onClose();
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();

            await createFeedback(values).unwrap();
            resetForm();
            onClose();
            setIsSuccessModalOpen(true);
        } catch {
            onClose();
            setIsErrorModalOpen(true);
        }
    };

    const onCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    const onRetry = () => {
        onShow();
        setIsErrorModalOpen(false);
    };

    const onCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    return (
        <React.Fragment>
            <Modal
                forceRender={true}
                title='Ваш отзыв'
                open={isModalOpen}
                centered={true}
                onCancel={onCancel}
                footer={
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        className={styles.button}
                        onClick={onSubmit}
                        disabled={isDisabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>
                }
                width='100%'
                className={styles.modal}
                wrapClassName={styles.wrap_modal}
                maskTransitionName=''
                transitionName=''
                maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(121, 156, 212, 0.5)' }}
            >
                <Form name='feedback' className={styles.form} form={form}>
                    <Form.Item name='rating' rules={[{ required: true }]} noStyle={true}>
                        <Rate
                            ref={ratingRef}
                            onChange={handleOnChange}
                            character={({ value, index }) =>
                                value && index !== undefined && index < value ? (
                                    <StarFilled />
                                ) : (
                                    <StarOutlined />
                                )
                            }
                            style={{ fontSize: '24px' }}
                            className={styles.rating}
                        />
                    </Form.Item>
                    <Form.Item name='message' className={styles.message_item} noStyle={true}>
                        <TextArea
                            autoSize={{ minRows: 2 }}
                            placeholder='Расскажите, почему Вам понравилось наше приложение'
                            className={styles.textarea}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <ErrorModal
                isModalOpen={isErrorModalOpen}
                onClose={onCloseErrorModal}
                onRetry={onRetry}
            />
            <SuccessModal onClose={onCloseSuccessModal} isModalOpen={isSuccessModalOpen} />
        </React.Fragment>
    );
};
