import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './training-create.module.scss';
import {
    Exercise,
    ExerciseResponse,
    Training,
    TrainingList,
    TrainingResponse,
} from '@redux/api/types';
import { Button, Empty, Modal, Select } from 'antd';
import emptyImage from '/empty-image-fit.svg';
import { useState } from 'react';
import { ExerciseEditor } from './exercise-editor';
import { ExerciseNameList } from './exercise-name-list';
import { Moment } from 'moment';
import {
    useAddTrainingMutation,
    useGetTrainingListQuery,
    useUpdateTrainingMutation,
} from '@redux/api/apiSlice';

type TrainingCreateProps = {
    trainingList: TrainingList;
    date: Moment;
    editableTraining?: TrainingResponse;
    onCancel: () => void;
    onClose: () => void;
};

export const TrainingCreate = ({
    trainingList,
    date,
    editableTraining,
    onCancel,
    onClose,
}: TrainingCreateProps) => {
    const { data: initialTrainingList = [] } = useGetTrainingListQuery();
    const [addTraining, { isLoading: isLoadingAdd }] = useAddTrainingMutation();
    const [updateTraining, { isLoading: isLoadingUpdate }] = useUpdateTrainingMutation();

    const isLoading = isLoadingAdd || isLoadingUpdate;

    const [selectedTrainingType, setSelectedTrainingType] = useState<
        TrainingList[number] | undefined
    >(
        editableTraining
            ? initialTrainingList.find((item) => item.name === editableTraining.name)
            : undefined,
    );

    const isEditable = !!(editableTraining && selectedTrainingType?.name === editableTraining.name);

    const [isExerciseOpen, setIsExerciseOpen] = useState(false);
    const [exerciseList, setExerciseList] = useState<Exercise[] | ExerciseResponse[]>(
        isEditable ? editableTraining.exercises : [],
    );
    const isEmpty = exerciseList.length === 0;

    const options = trainingList.map((item) => ({ value: item.key, label: item.name }));

    const handleChangeSelect = (value: string) => {
        const trainingType = trainingList.find((item) => item.key === value);
        if (trainingType) {
            setExerciseList([]);
            setSelectedTrainingType(trainingType);
        }
    };

    const handleOnClose = (newExerciseList: Exercise[]) => {
        setExerciseList(newExerciseList);
        setIsExerciseOpen(false);
    };

    const showErrorModal = () => {
        return Modal.error({
            title: (
                <span data-test-id='modal-error-user-training-title'>
                    При сохранении данных произошла&nbsp;ошибка
                </span>
            ),
            content: (
                <span data-test-id='modal-error-user-training-subtitle'>
                    Придётся попробовать ещё раз
                </span>
            ),
            closable: false,
            centered: true,
            okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
            width: '100%',
            maskStyle: {
                backdropFilter: 'blur(6px)',
                background: 'rgba(121, 156, 212, 0.1)',
                zIndex: 2100,
            },
            className: styles.error_modal,
            wrapClassName: styles.error_modal_wrapper,
            onOk: onClose,
        });
    };

    const handleSave = async () => {
        if (editableTraining) {
            const training: TrainingResponse = {
                ...editableTraining,
                exercises: exerciseList as ExerciseResponse[],
            };
            try {
                await updateTraining(training).unwrap();
                onCancel();
            } catch {
                showErrorModal();
            }
        } else {
            if (selectedTrainingType && !isEmpty) {
                const training: Training = {
                    name: selectedTrainingType.name,
                    date: date.toISOString(),
                    exercises: exerciseList,
                };
                try {
                    await addTraining(training).unwrap();
                    onCancel();
                } catch {
                    showErrorModal();
                }
            }
        }
    };

    return (
        <>
            <Button
                icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
                type='text'
                className={styles.cancel_button}
                onClick={onCancel}
                size='small'
                data-test-id='modal-exercise-training-button-close'
            />

            <div className={styles.modal_header}>
                <div className={styles.select}>
                    <Select
                        style={{ width: '100%' }}
                        size='small'
                        placeholder='Выбор типа тренировки'
                        popupClassName={styles.select_popup}
                        value={selectedTrainingType?.key}
                        onChange={handleChangeSelect}
                        data-test-id='modal-create-exercise-select'
                    >
                        {options.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                        {isEditable && (
                            <Select.Option
                                key={
                                    initialTrainingList.find(
                                        (item) => item.name === editableTraining?.name,
                                    )?.key
                                }
                                value={
                                    initialTrainingList.find(
                                        (item) => item.name === editableTraining?.name,
                                    )?.key
                                }
                            >
                                {
                                    initialTrainingList.find(
                                        (item) => item.name === editableTraining?.name,
                                    )?.name
                                }
                            </Select.Option>
                        )}
                    </Select>
                </div>
            </div>
            <div className={styles.modal_content}>
                {isEmpty ? (
                    <Empty
                        image={emptyImage}
                        description=''
                        imageStyle={{ height: 32, margin: '0' }}
                        className={styles.empty}
                    />
                ) : (
                    <ExerciseNameList onEdit={() => setIsExerciseOpen(true)} items={exerciseList} />
                )}
            </div>
            <div className={styles.modal_footer}>
                <Button
                    block
                    onClick={() => setIsExerciseOpen(true)}
                    disabled={!selectedTrainingType}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='link'
                    block
                    onClick={handleSave}
                    disabled={isEmpty || !selectedTrainingType}
                    loading={isLoading}
                >
                    Сохранить
                </Button>
            </div>
            {isExerciseOpen && (
                <ExerciseEditor
                    isEditable={isEditable}
                    isOpen={isExerciseOpen}
                    trainingType={selectedTrainingType || { name: '', key: '' }}
                    date={date}
                    exerciseList={exerciseList}
                    onClose={handleOnClose}
                />
            )}
        </>
    );
};
