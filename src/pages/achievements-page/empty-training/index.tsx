import { Image } from 'antd';

import styles from './empty-training.module.scss';

import emptyImage from '/empty-training.svg';

export const EmptyTraining = () => (
    <div className={styles.empty_training}>
        <div>
            <Image preview={false} src={emptyImage} className={styles.image} />
        </div>
        <h3 className={styles.title}>Ой, такой тренировки на этой неделе не&nbsp;было.</h3>
    </div>
);
