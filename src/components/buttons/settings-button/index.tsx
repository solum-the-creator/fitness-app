import { useMediaQuery } from 'react-responsive';
import { push } from 'redux-first-history';
import { SettingOutlined } from '@ant-design/icons';
import PATHS from '@constants/paths';
import { useAppDispatch } from '@redux/configure-store';
import { Button } from 'antd';

export const SettingsButton = () => {
    const matchesMobile = useMediaQuery({ query: '(max-width: 480px)' });
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(push(PATHS.SETTINGS));
    };

    return (
        <Button
            icon={<SettingOutlined />}
            type='text'
            shape={matchesMobile ? 'circle' : 'default'}
            onClick={onClick}
            data-test-id='header-settings'
        >
            {!matchesMobile && 'Настройки'}
        </Button>
    );
};
