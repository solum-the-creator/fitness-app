/* eslint-disable no-underscore-dangle */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
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
    period?: string;
};

export const TrainingsTable = ({ trainings, onCreate }: TrainingsTableProps) => {
    const columns: ColumnsType<TableType> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Сортировка по периоду',
            dataIndex: 'period',
            key: 'period',
        },
        {
            title: '',
            key: 'action',
            render: () => <Button type='text' icon={<EditOutlined />} />,
        },
    ];

    const data: TableType[] = trainings.map((training) => ({
        key: training._id,
        type: training.name,
        period: training.parameters?.period?.toString(),
    }));

    return (
        <div className={styles.main_container}>
            <Table columns={columns} dataSource={data} />
            <Button type='primary' size='large' icon={<PlusOutlined />} onClick={onCreate}>
                Новая тренировка
            </Button>
        </div>
    );
};
