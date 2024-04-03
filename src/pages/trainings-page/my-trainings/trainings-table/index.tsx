/* eslint-disable no-underscore-dangle */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PERIOD_TO_STRING } from '@constants/constants';
import { TrainingResponse } from '@redux/api/types';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';

import styles from './trainings-table.module.scss';

type TrainingsTableProps = {
    trainings: TrainingResponse[];
    onCreate: () => void;
};

type TableType = {
    key: React.Key;
    type: string;
    period?: number;
    action: React.ReactNode;
};

export const TrainingsTable = ({ trainings, onCreate }: TrainingsTableProps) => {
    const periodSorter = (a: TableType, b: TableType) => (a.period ?? 0) - (b.period ?? 0);

    const columns: ColumnsType<TableType> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Периодичность',
            dataIndex: 'period',
            key: 'period',
            render: (period: number) => PERIOD_TO_STRING[period],
            sorter: periodSorter,
            // defaultSortOrder: 'descend',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const data: TableType[] = trainings.map((training) => ({
        key: training._id,
        type: training.name,
        period: training.parameters ? training.parameters.period : 0,
        action: <Button type='text' icon={<EditOutlined />} />,
    }));

    return (
        <div className={styles.main_container}>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                data-test-id='my-trainings-table'
            />
            <Button
                type='primary'
                size='large'
                icon={<PlusOutlined />}
                onClick={onCreate}
                data-test-id='create-new-training-button'
            >
                Новая тренировка
            </Button>
        </div>
    );
};
