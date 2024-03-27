import { useMediaQuery } from 'react-responsive';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';

import styles from './switch-item.module.scss';

type SwitchItemProps = {
    text: React.ReactNode;
    checked?: boolean;
    tooltipText?: React.ReactNode;
    disabled?: boolean;
    tooltipWidth?: number;
    loading?: boolean;
    testId?: string;
    tooltipTestId?: string;
    onChange?: (checked: boolean) => void;
};

export const SwitchItem = ({
    text,
    disabled,
    checked,
    tooltipText,
    tooltipWidth,
    loading,
    testId,
    tooltipTestId,
    onChange,
}: SwitchItemProps) => {
    const matches = useMediaQuery({ query: '(max-width: 480px)' });

    const disabledClass = disabled ? styles.disabled : '';

    return (
        <div className={`${styles.switch_item_container} ${disabledClass}`} data-test-id={testId}>
            <div className={styles.info_container}>
                <span className={styles.switch_text}>{text}</span>
                <Tooltip
                    title={tooltipText}
                    className={styles.tooltip}
                    arrowPointAtCenter={true}
                    overlayStyle={{ maxWidth: `${tooltipWidth}px` }}
                    placement={matches ? 'topRight' : 'bottomLeft'}
                >
                    <ExclamationCircleOutlined
                        className={styles.info_icon}
                        data-test-id={tooltipTestId}
                    />
                </Tooltip>

                <div />
            </div>
            <div className={styles.switch_container}>
                <Switch
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                    loading={loading}
                />
            </div>
        </div>
    );
};
