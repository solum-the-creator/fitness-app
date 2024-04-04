/* eslint-disable no-underscore-dangle */
import { useMediaQuery } from 'react-responsive';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PERIOD_TO_STRING } from '@constants/constants';
import { TrainingList, TrainingResponse } from '@redux/api/types';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';

import { TrainingTypeCell } from './training-type-cell';

import styles from './trainings-table.module.scss';

type TrainingsTableProps = {
    trainings: TrainingResponse[];
    trainingList: TrainingList;
    onCreate: () => void;
};

type TableType = {
    key: React.Key;
    type: string;
    period?: number;
    action: React.ReactNode;
};

export const TrainingsTable = ({ trainings, trainingList, onCreate }: TrainingsTableProps) => {
    const matches = useMediaQuery({ query: '(max-width: 480px)' });

    const periodSorter = (a: TableType, b: TableType) => (a.period ?? 0) - (b.period ?? 0);

    const columns: ColumnsType<TableType> = [
        {
            title: <div className={styles.title}>Тип тренировки</div>,
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <TrainingTypeCell
                    type={trainingList.find((item) => item.name === type)?.key || 'default'}
                    name={type}
                />
            ),
        },
        {
            title: <div className={styles.title}>Периодичность</div>,
            dataIndex: 'period',
            key: 'period',
            render: (period: number) => <div>{PERIOD_TO_STRING[period]}</div>,
            sorter: periodSorter,
        },
        {
            title: undefined,
            dataIndex: 'action',
            key: 'action',
            width: 32,
        },
    ];

    const data: TableType[] = trainings.map((training) => ({
        key: training._id,
        type: training.name,
        period: training.parameters ? training.parameters.period : 0,
        action: (
            <Button
                type='link'
                className={styles.edit_button}
                icon={<EditOutlined className={styles.edit_icon} />}
            />
        ),
    }));

    return (
        <div className={styles.main_container}>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: matches ? 8 : 14,
                    position: ['bottomLeft'],
                }}
                size='small'
                data-test-id='my-trainings-table'
            />
            <div>
                <Button
                    type='primary'
                    size='large'
                    icon={<PlusOutlined />}
                    onClick={onCreate}
                    block={matches}
                    data-test-id='create-new-training-button'
                >
                    Новая тренировка
                </Button>
            </div>
        </div>
    );
};
