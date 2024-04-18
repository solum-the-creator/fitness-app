import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import cn from 'classnames';
import Lottie from 'lottie-react';

import loaderAnimation from './loader.json';

import styles from './loader.module.scss';

export const Loader = () => {
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);

    return (
        <div className={cn(styles.loader, { [styles.loader_hidden]: !isLoading })}>
            <div className={styles.loader_container}>
                <Lottie
                    animationData={loaderAnimation}
                    style={{ width: '150px', height: '150px' }}
                    data-test-id='loader'
                />
            </div>
        </div>
    );
};
