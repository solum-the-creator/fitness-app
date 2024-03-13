import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './training-create.module.scss';
import { TrainingList } from '@redux/api/types';
import { Button, Empty, Select } from 'antd';
import emptyImage from '/empty-image-fit.svg';

type TrainingCreateProps = {
    onCancel: () => void;
    trainingList: TrainingList;
};

export const TrainingCreate = ({ onCancel, trainingList }: TrainingCreateProps) => {
    console.log(trainingList);

    const options = trainingList.map((item) => ({ value: item.key, label: item.name }));

    return (
        <>
            <div className={styles.modal_header}>
                <div className={styles.cancel}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        type='text'
                        className={styles.button}
                        onClick={onCancel}
                    />
                </div>
                <div className={styles.select}>
                    <Select
                        style={{ width: '100%' }}
                        size='small'
                        placeholder='Выбор типа тренировки'
                        popupClassName={styles.select_popup}
                        options={options}
                    />
                </div>
            </div>
            <div className={styles.modal_content}>
                <Empty
                    image={emptyImage}
                    description=''
                    imageStyle={{ height: 32, margin: '0' }}
                    className={styles.empty}
                />
            </div>
            <div className={styles.modal_footer}>
                <Button block>Добавить упражнения</Button>
                <Button type='link' block>
                    Сохранить
                </Button>
            </div>
        </>
    );
};
