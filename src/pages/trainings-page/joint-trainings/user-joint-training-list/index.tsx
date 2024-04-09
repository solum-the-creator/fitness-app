import { useMediaQuery } from 'react-responsive';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingPartner } from '@redux/api/types';
import { sortByStatusAndName } from '@utils/sorting';
import { Button, List } from 'antd';
import Search from 'antd/lib/input/Search';

import { UserJointCard } from './user-joint-card';

import styles from './user-joint-training-list.module.scss';

type UserJointTrainingListProps = {
    users: TrainingPartner[];
    onBack: () => void;
};

export const UserJointTrainingList = ({ users, onBack }: UserJointTrainingListProps) => {
    const matches = useMediaQuery({ query: '(max-width: 1040px)' });

    const sortedUsers = [...users].sort(sortByStatusAndName);

    return (
        <div className={styles.main_container}>
            <div className={styles.header}>
                <Button
                    type='text'
                    size='large'
                    className={styles.button_back}
                    icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
                    onClick={onBack}
                >
                    Назад
                </Button>
                <Search
                    placeholder='Поиск по имени'
                    className={styles.search}
                    data-test-id='search-input'
                />
            </div>
            <List
                className={styles.user_joint_list}
                pagination={{ position: 'bottom', pageSize: matches ? 8 : 12, size: 'small' }}
                dataSource={sortedUsers}
                renderItem={(user) => <UserJointCard {...user} key={user.id} />}
            />
        </div>
    );
};
