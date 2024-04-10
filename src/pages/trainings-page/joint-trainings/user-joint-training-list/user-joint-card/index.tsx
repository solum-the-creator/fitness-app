import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { INVITE_STATUS } from '@constants/constants';
import { InviteStatus } from '@redux/api/types';
import { splitNameBySearch } from '@utils/sorting';
import { Avatar, Button, Tooltip } from 'antd';

import styles from './user-joint-card.module.scss';

type UserJointCardProps = {
    id: string;
    name: string;
    trainingType: string;
    avgWeightInWeek: number;
    status: InviteStatus | null;
    index: number;
    openDrawer: (id: string) => void;
    imageSrc?: string | null;
    searchValue?: string;
};

export const UserJointCard = ({
    id,
    name,
    trainingType,
    avgWeightInWeek,
    status,
    index,
    imageSrc,
    openDrawer,
    searchValue = '',
}: UserJointCardProps) => {
    const isAccepted = status === INVITE_STATUS.accepted;
    const isRejected = status === INVITE_STATUS.rejected;
    const isPending = status === INVITE_STATUS.pending;

    const { prefix, highlight, suffix } = splitNameBySearch(name, searchValue);

    return (
        <div className={styles.card} data-test-id={`joint-training-cards${index}`}>
            <div className={styles.partner_info}>
                <Avatar
                    src={imageSrc}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                    size={42}
                />
                <p className={styles.partner_name}>
                    <span>{prefix}</span>
                    <span className={styles.highlight}>{highlight}</span>
                    <span>{suffix}</span>
                </p>
            </div>
            <div className={styles.training_info}>
                <div className={styles.info_label}>Тип тренировки:</div>
                <div className={styles.info_value}>{trainingType}</div>
                <div className={styles.info_label}>Средняя нагрузка:</div>
                <div className={styles.info_value}>{avgWeightInWeek} кг/нед</div>
            </div>

            {isAccepted ? (
                <Button size='small' className={styles.button}>
                    Отменить тренировку
                </Button>
            ) : (
                <Button
                    type='primary'
                    size='small'
                    className={styles.button}
                    disabled={isPending}
                    onClick={() => openDrawer(id)}
                >
                    Создать тренировку
                </Button>
            )}

            <div className={styles.status}>
                {isAccepted && (
                    <span className={styles.status_text}>
                        тренировка одобрена <CheckCircleFilled style={{ color: '#52C41A' }} />
                    </span>
                )}
                {isPending && <span className={styles.status_text}>ожидает подтверждения</span>}
                {isRejected && (
                    <span className={styles.status_text}>
                        тренировка отклонена
                        <Tooltip
                            title='повторный запрос будет доступнен через 2 недели'
                            className={styles.tooltip}
                            placement='bottomRight'
                        >
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    </span>
                )}
            </div>
        </div>
    );
};
