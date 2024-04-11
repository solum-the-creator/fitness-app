import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingList, TrainingPartner } from '@redux/api/types';
import { useAppSelector } from '@redux/configure-store';
import { sortByStatusAndName } from '@utils/sorting';
import { Button, List } from 'antd';
import Search from 'antd/lib/input/Search';
import { Moment } from 'moment';

import { TrainingDrawer } from './training-drawer';
import { UserJointCard } from './user-joint-card';

import styles from './user-joint-training-list.module.scss';

type UserJointTrainingListProps = {
    trainingList: TrainingList;
    trainingDates: Moment[];
    onBack: () => void;
};

export const UserJointTrainingList = ({
    trainingDates,
    trainingList,
    onBack,
}: UserJointTrainingListProps) => {
    const matches = useMediaQuery({ query: '(max-width: 1040px)' });

    const users = useAppSelector((state) => state.userJointList);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [currentPartner, setCurrentPartner] = useState<TrainingPartner | undefined>(undefined);

    const sortedUsers = [...users].sort(sortByStatusAndName);

    const possiblePartners = users.reduce(
        (acc, user) => (user.status && user.status !== 'rejected' ? acc + 1 : acc),
        0,
    );
    const canAddPartner = possiblePartners <= 4;

    const openDrawer = (id: string) => {
        setCurrentPartner(sortedUsers.find((user) => user.id === id));
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const filteredUsers = sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

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
                    value={searchValue}
                    onChange={handleSearchChange}
                    className={styles.search}
                    data-test-id='search-input'
                />
            </div>
            <List
                className={styles.user_joint_list}
                pagination={{
                    position: 'bottom',
                    pageSize: matches ? 8 : 12,
                    size: 'small',
                    showSizeChanger: false,
                }}
                dataSource={filteredUsers}
                renderItem={(user, index) => (
                    <UserJointCard
                        disabled={!canAddPartner}
                        openDrawer={openDrawer}
                        index={index}
                        {...user}
                        key={user.id}
                        searchValue={searchValue}
                    />
                )}
            />
            {isDrawerOpen && currentPartner && (
                <TrainingDrawer
                    trainingPartner={currentPartner}
                    trainingList={trainingList}
                    isOpen={isDrawerOpen}
                    trainingDates={trainingDates}
                    onClose={closeDrawer}
                />
            )}
        </div>
    );
};
