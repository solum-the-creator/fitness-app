import { Button, Drawer } from 'antd';
import styles from './exercise-editor.module.scss';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { ExerciseItem } from './exercise-item';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Exercise, TrainingList } from '@redux/api/types';
import { Moment } from 'moment';
import { DATE_FORMAT } from '@constants/constants';
import { nanoid } from 'nanoid';

type ExerciseEditorProps = {
    isOpen: boolean;
    trainingType: TrainingList[number];
    exerciseList: Exercise[];
    date: Moment;
    isEditable: boolean;
    onClose: (exerciseList: Exercise[]) => void;
};

const emptyExercise: Partial<Exercise> = {
    name: '',
    replays: undefined,
    approaches: undefined,
    weight: undefined,
    isImplementation: false,
};

export const ExerciseEditor = ({
    trainingType,
    isEditable,
    exerciseList: currentExerciseList,
    date,
    isOpen,
    onClose,
}: ExerciseEditorProps) => {
    const matches = useMediaQuery({ query: `(max-width: 680px)` });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    const isEmpty = currentExerciseList.length === 0;
    const initialExerciseList = isEmpty ? [emptyExercise] : currentExerciseList;

    const [exerciseList, setExerciseList] = useState<Partial<Exercise>[]>(
        initialExerciseList.map((item) => ({
            ...item,
            tempId: nanoid(),
        })),
    );
    const [checkedExerciseList, setCheckedExerciseList] = useState<string[]>([]);

    const handleAddExerciseClick = () => {
        const newExercise = {
            ...emptyExercise,
            tempId: nanoid(),
        };
        setExerciseList([...exerciseList, newExercise]);
    };

    const handleCheckChange = (id: string) => {
        if (checkedExerciseList.includes(id)) {
            setCheckedExerciseList(checkedExerciseList.filter((item) => item !== id));
        } else {
            setCheckedExerciseList([...checkedExerciseList, id]);
        }
    };

    const updateExerciseList = (exercise: Partial<Exercise>) => {
        const updatedExerciseList = exerciseList.map((item) => {
            if (item.tempId === exercise.tempId) {
                return {
                    ...item,
                    ...exercise,
                };
            }
            return item;
        });
        setExerciseList(updatedExerciseList);
    };

    const onDeleteExercise = () => {
        setExerciseList(
            exerciseList.filter((item) => !checkedExerciseList.includes(item.tempId as string)),
        );
        setCheckedExerciseList([]);
    };

    const filterExerciseList = (exerciseList: Partial<Exercise>[]) => {
        const filteredList = exerciseList
            .filter((item) => item.name?.trim() !== '')
            .map((item) => ({
                ...item,
                replays: item.replays === undefined ? 1 : item.replays,
                approaches: item.approaches === undefined ? 1 : item.approaches,
                weight: item.weight === undefined ? 0 : item.weight,
            }));

        setExerciseList(filteredList);
        return filteredList;
    };

    const onCloseEditor = () => {
        const filteredExerciseList = filterExerciseList(exerciseList) as Exercise[];

        onClose(filteredExerciseList);
    };

    return (
        <Drawer
            width={matches ? '100%' : 408}
            height={matches ? 555 : '100%'}
            placement={matches ? 'bottom' : 'right'}
            open={isOpen}
            closable={false}
            onClose={onCloseEditor}
            maskStyle={{ backgroundColor: 'transparent' }}
            className={`${styles.drawer} ${drawerClass}`}
            data-test-id='modal-drawer-right'
        >
            <div className={styles.drawer_wrapper}>
                <div className={styles.drawer_header}>
                    <span className={styles.drawer_icon}>
                        <PlusOutlined />
                    </span>
                    <h4 className={styles.drawer_title}>
                        {isEditable ? 'Редактирование' : <>Добавление&nbsp;упражнений</>}
                    </h4>
                    <Button
                        type='text'
                        icon={<CloseOutlined style={{ fontSize: '14px' }} />}
                        onClick={onCloseEditor}
                        className={styles.button_close}
                        data-test-id='modal-drawer-right-button-close'
                    />
                </div>
                <div className={styles.drawer_info}>
                    <TrainingTypeBadge
                        type={trainingType.key}
                        text={trainingType.name}
                        color='#8c8c8c'
                    />

                    <div className={styles.date}>{date.format(DATE_FORMAT)}</div>
                </div>
                <div className={styles.drawer_body}>
                    <div className={styles.exercise_list}>
                        {exerciseList.map((item, index) => (
                            <ExerciseItem
                                isEditable={isEditable}
                                key={item.tempId}
                                item={item}
                                index={index}
                                onCheckChange={handleCheckChange}
                                onUpdate={updateExerciseList}
                            />
                        ))}
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            block
                            icon={<PlusOutlined />}
                            size='large'
                            className={styles.add_button}
                            style={isEditable ? { textAlign: 'center' } : { textAlign: 'start' }}
                            onClick={handleAddExerciseClick}
                        >
                            Добавить ещё
                        </Button>
                        {isEditable && (
                            <Button
                                block
                                icon={<MinusOutlined />}
                                size='large'
                                type='text'
                                disabled={checkedExerciseList.length === 0}
                                className={styles.delete_button}
                                onClick={onDeleteExercise}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Drawer>
    );
};
