/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
    useAddTrainingMutation,
    useGetTrainingListQuery,
    useUpdateTrainingMutation,
} from '@redux/api/api-slice';
import { Exercise, Training, TrainingList, TrainingResponse } from '@redux/api/types';
import { isPastDate } from '@utils/date-utils';
import { availableTrainings } from '@utils/missing-trainings';
import { Button, Empty, Modal, Select } from 'antd';
import { Moment } from 'moment';

import { ExerciseEditor } from './exercise-editor';
import { ExerciseNameList } from './exercise-name-list';

import styles from './training-create.module.scss';

import emptyImage from '/empty-image-fit.svg';

type TrainingCreateProps = {
    trainingList: TrainingList;
    trainings: TrainingResponse[];
    date: Moment;
    editableTraining?: TrainingResponse;
    onCancel: () => void;
    onClose: () => void;
};

export const TrainingCreate = ({
    trainingList,
    trainings,
    date,
    editableTraining: initialEditableTraining,
    onCancel,
    onClose,
}: TrainingCreateProps) => {
    const { data: initialTrainingList = [] } = useGetTrainingListQuery();
    const [addTraining, { isLoading: isLoadingAdd }] = useAddTrainingMutation();
    const [updateTraining, { isLoading: isLoadingUpdate }] = useUpdateTrainingMutation();

    const isLoading = isLoadingAdd || isLoadingUpdate;

    const [editableTraining, setEditableTraining] = useState<TrainingResponse | undefined>(
        initialEditableTraining,
    );
    const [selectedTrainingType, setSelectedTrainingType] = useState<
        TrainingList[number] | undefined
    >(
        editableTraining
            ? initialTrainingList.find((item) => item.name === editableTraining.name)
            : undefined,
    );

    const isPast = isPastDate(date);
    const options = isPast
        ? availableTrainings(initialTrainingList, trainings).map((item) => ({
              value: item.key,
              label: item.name,
          }))
        : trainingList.map((item) => ({ value: item.key, label: item.name }));

    const isEditable = !!(editableTraining && selectedTrainingType?.name === editableTraining.name);

    const [isExerciseOpen, setIsExerciseOpen] = useState(false);
    const [exerciseList, setExerciseList] = useState<Exercise[]>(
        isEditable ? editableTraining.exercises : [],
    );
    const isEmpty = exerciseList.length === 0;

    const handleChangeSelect = (value: string) => {
        const trainingType = initialTrainingList.find((item) => item.key === value);

        if (trainingType) {
            const existTraining = trainings.find((item) => item.name === trainingType.name);

            if (existTraining) {
                setEditableTraining(existTraining);
                setExerciseList(existTraining.exercises);
            } else {
                setEditableTraining(undefined);
                setExerciseList([]);
            }
            setSelectedTrainingType(trainingType);
        }
    };

    const handleOnClose = (newExerciseList: Exercise[]) => {
        setExerciseList(newExerciseList);
        setIsExerciseOpen(false);
    };

    const showErrorModal = () =>
        Modal.error({
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
                zIndex: 11,
            },
            className: styles.error_modal,
            wrapClassName: styles.error_modal_wrapper,
            onOk: onClose,
        });

    const handleSave = async () => {
        if (editableTraining) {
            const training: Training = {
                name: editableTraining.name,
                date: editableTraining.date,
                isImplementation: isPast,
                exercises: [...exerciseList],
                parameters: editableTraining.parameters,
            };

            try {
                await updateTraining({
                    id: editableTraining._id,
                    training: { ...training },
                }).unwrap();
                onCancel();
            } catch {
                showErrorModal();
            }
        } else if (selectedTrainingType && !isEmpty) {
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
    };

    return (
        <React.Fragment>
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
                        {isEditable && !isPast && (
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
                    block={true}
                    onClick={() => setIsExerciseOpen(true)}
                    disabled={!selectedTrainingType}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='link'
                    block={true}
                    onClick={handleSave}
                    disabled={isEmpty || !selectedTrainingType}
                    loading={isLoading}
                >
                    {isPast ? 'Сохранить изменения' : 'Сохранить'}
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
        </React.Fragment>
    );
};
