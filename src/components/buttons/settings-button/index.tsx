import { useMediaQuery } from 'react-responsive';
import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const SettingsButton = () => {
    const matchesMobile = useMediaQuery({ query: '(max-width: 480px)' });

    return (
        <Button
            icon={<SettingOutlined />}
            type={matchesMobile ? 'default' : 'text'}
            shape={matchesMobile ? 'circle' : 'default'}
        >
            {!matchesMobile && 'Настройки'}
        </Button>
    );
};
