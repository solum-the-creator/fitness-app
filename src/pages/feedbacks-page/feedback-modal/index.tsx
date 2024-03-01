import { Button, Form, Modal, Rate } from 'antd';
import styles from './feedback-modal.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { StarTwoTone } from '@ant-design/icons';

type FeedbackModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
};

export const FeedbackModal = ({ isModalOpen, onClose }: FeedbackModalProps) => {
    const [form] = Form.useForm();
    const onFinish = () => {
        console.log('onFinish');
    };
    return (
        <Modal
            title='Ваш отзыв'
            open={isModalOpen}
            centered
            onCancel={onClose}
            footer={
                <Button type='primary' onClick={onFinish} size='large' className={styles.button}>
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
            <Form name='feedback' className={styles.form} onFinish={onFinish} form={form}>
                <Form.Item name='rating' rules={[{ required: true }]} noStyle>
                    <Rate
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
