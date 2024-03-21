import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './exercise-name-item.module.scss';

type ExerciseNameItemProps = {
    name: string;
    index: number;
    onEdit: () => void;
};

export const ExerciseNameItem = ({ name, index, onEdit }: ExerciseNameItemProps) => (
    <div className={styles.exercise_item}>
        <span className={styles.exercise_name}>{name}</span>
        <Button
            type='link'
            icon={<EditOutlined />}
            size='small'
            onClick={onEdit}
            className={styles.button}
            data-test-id={`modal-update-training-edit-button${index}`}
        />
    </div>
);
