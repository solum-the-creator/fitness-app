import { Button, Drawer } from 'antd';
import styles from './exercise-editor.module.scss';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { ExerciseItem } from './exercise-item';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type ExerciseEditorProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const ExerciseEditor = ({ isOpen, onClose }: ExerciseEditorProps) => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const [exerciseList, setExerciseList] = useState([
        { name: '', approach: undefined, weight: undefined, count: undefined },
    ]);

    const handleAddExerciseClick = () => {
        setExerciseList([
            ...exerciseList,
            { name: '', approach: undefined, weight: undefined, count: undefined },
        ]);
    };

    return (
        <Drawer
            width={matches ? '100%' : 408}
            height={matches ? 555 : '100%'}
            placement={matches ? 'bottom' : 'right'}
            open={isOpen}
            closable={false}
            onClose={onClose}
            maskStyle={{ backgroundColor: 'transparent' }}
            className={`${styles.drawer} ${drawerClass}`}
        >
            <div className={styles.drawer_wrapper}>
                <div className={styles.drawer_header}>
                    <span className={styles.drawer_icon}>
                        <PlusOutlined />
                    </span>
                    <h4 className={styles.drawer_title}>Добавление&nbsp;упражнений</h4>
                    <Button
                        type='text'
                        icon={<CloseOutlined style={{ fontSize: '14px' }} />}
                        onClick={onClose}
                        className={styles.button_close}
                    />
                </div>
                <div className={styles.drawer_info}>
                    <TrainingTypeBadge type='strength' text='Силовая' />

                    <div className={styles.date}>19.01.2024</div>
                </div>
                <div className={styles.drawer_body}>
                    <div className={styles.exercise_list}>
                        {exerciseList.map((_, index) => (
                            <ExerciseItem key={index} />
                        ))}
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            block
                            icon={<PlusOutlined />}
                            size='large'
                            className={styles.add_button}
                            onClick={handleAddExerciseClick}
                        >
                            Добавить ещё
                        </Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};
