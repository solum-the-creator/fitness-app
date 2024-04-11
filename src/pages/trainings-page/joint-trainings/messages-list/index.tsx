/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Invite, TrainingList } from '@redux/api/types';
import { Button } from 'antd';

import { MessageItem } from './message-item';

import styles from './messages-list.module.scss';

type MessagesListProps = {
    invites: Invite[];
    trainingList: TrainingList;
};

export const MessagesList = ({ invites, trainingList }: MessagesListProps) => {
    const [showAll, setShowAll] = useState(false);

    const inviteCount = invites.length;

    const messagesToDisplay = showAll ? invites : [invites[0]];

    const handleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.messages_label}>Новое сообщение ({inviteCount})</div>
            <div className={styles.messages_list}>
                {messagesToDisplay.map((invite) => (
                    <MessageItem
                        key={invite._id}
                        inviteId={invite._id}
                        user={invite.from}
                        date={invite.createdAt}
                        training={invite.training}
                        trainingList={trainingList}
                    />
                ))}
            </div>
            {inviteCount > 1 && (
                <div className={styles.show_more}>
                    <Button
                        size='small'
                        type='link'
                        icon={
                            showAll ? (
                                <UpOutlined style={{ fontSize: 12 }} />
                            ) : (
                                <DownOutlined style={{ fontSize: 12 }} />
                            )
                        }
                        className={styles.button_more}
                        onClick={handleShowAll}
                    >
                        {showAll ? 'Скрыть все сообщения' : 'Показать все сообщения'}
                    </Button>
                </div>
            )}
        </div>
    );
};
