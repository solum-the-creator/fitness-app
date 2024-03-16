import { Button } from 'antd';
import styles from './exercise-name-item.module.scss';
import { EditOutlined } from '@ant-design/icons';

type ExerciseNameItemProps = {
    name: string;
    onEdit: () => void;
};

export const ExerciseNameItem = ({ name, onEdit }: ExerciseNameItemProps) => {
    return (
        <div className={styles.exercise_item}>
            <span className={styles.exercise_name}>{name}</span>
            <Button
                type='link'
                icon={<EditOutlined />}
                size='small'
                onClick={onEdit}
                className={styles.button}
            />
        </div>
    );
};
