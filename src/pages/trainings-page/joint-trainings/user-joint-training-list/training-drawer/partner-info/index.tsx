import { UserOutlined } from '@ant-design/icons';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { avatarStyles, COLORS } from '@constants/styles';
import { TrainingList } from '@redux/api/types';
import { Avatar } from 'antd';

import styles from './partner-info.module.scss';

type PartnerInfoProps = {
    name: string;
    trainingType: string;
    trainingList: TrainingList;
    imageSrc: string | null;
};

export const PartnerInfo = ({ name, trainingType, trainingList, imageSrc }: PartnerInfoProps) => {
    const typeKey = trainingList.find((item) => item.name === trainingType)?.key as string;

    return (
        <div className={styles.wrapper}>
            <div className={styles.partner_info}>
                <Avatar src={imageSrc} icon={<UserOutlined />} style={avatarStyles} size={42} />
                <p className={styles.partner_name}>{name}</p>
            </div>
            <div className={styles.training_type}>
                <TrainingTypeBadge
                    type={typeKey}
                    text={trainingType}
                    color={COLORS.characterLightSecondary}
                />
            </div>
        </div>
    );
};
