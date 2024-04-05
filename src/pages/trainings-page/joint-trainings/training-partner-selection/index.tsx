import { Button } from 'antd';

import styles from './training-partner-selection.module.scss';

type TrainingPartnerSelectionProps = {
    selectRandom: () => void;
    selectByType: () => void;
};

export const TrainingPartnerSelection = ({
    selectRandom,
    selectByType,
}: TrainingPartnerSelectionProps) => {
    const handleSelectRandom = () => {
        selectRandom();
    };

    const handleSelectByType = () => {
        selectByType();
    };

    return (
        <div className={styles.selection_container}>
            <div className={styles.selection_body}>
                <h3 className={styles.selection_title}>
                    Хочешь тренироваться с&nbsp;тем, кто разделяет твои цели и&nbsp;темп?
                    <br />
                    Можешь найти друга для совместных тренировок среди других пользователей.
                </h3>
                <p className={styles.selection_description}>
                    Можешь воспользоваться случайным выбором или выбрать друга с&nbsp;похожим
                    на&nbsp;твой уровень и&nbsp;вид тренировки, и&nbsp;мы&nbsp;найдем тебе
                    идеального спортивного друга.
                </p>
            </div>
            <div className={styles.buttons_container}>
                <Button type='link' onClick={handleSelectRandom} block={true}>
                    Случайный выбор
                </Button>
                <Button type='text' onClick={handleSelectByType} block={true}>
                    Выбор друга по моим видам тренировок
                </Button>
            </div>
        </div>
    );
};
