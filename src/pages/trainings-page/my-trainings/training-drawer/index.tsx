import { useMediaQuery } from 'react-responsive';
import { PlusOutlined } from '@ant-design/icons';
import { TrainingList } from '@redux/api/types';
import { Button, Drawer } from 'antd';

import { DrawerHeader } from './drawer-header';
import { ExerciseList } from './exercise-list';
import { TrainingInfo } from './training-info';

import styles from './training-drawer.module.scss';

type TrainingDrawerProps = {
    isOpen: boolean;
    trainingList: TrainingList;
    onClose: () => void;
    isEditable?: boolean;
};

export const TrainingDrawer = ({
    isOpen,
    trainingList,
    onClose,
    isEditable,
}: TrainingDrawerProps) => {
    const matches = useMediaQuery({ query: '(max-width: 680px)' });
    const drawerClass = matches ? styles.drawer_mobile : styles.drawer_fullscreen;

    return (
        <Drawer
            width={matches ? '100%' : 408}
            height={matches ? 555 : '100%'}
            placement={matches ? 'bottom' : 'right'}
            open={isOpen}
            closable={false}
            onClose={onClose}
            maskStyle={{ backgroundColor: 'transparent' }}
            className={`${styles.drawer} ${drawerClass}`}
        >
            <div className={styles.drawer_wrapper}>
                <DrawerHeader onClose={onClose} isEditable={isEditable} />
                <div className={styles.drawer_body}>
                    <TrainingInfo trainingList={trainingList} />
                    <ExerciseList />
                    <div className={styles.buttons}>
                        <Button
                            block={true}
                            icon={<PlusOutlined />}
                            size='large'
                            className={styles.add_button}
                            style={{ textAlign: 'start' }}
                            // onClick={handleAddExerciseClick}
                        >
                            Добавить ещё упражнение
                        </Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};
