import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

export const SettingsButton = () => {
    const matchesMobile = useMediaQuery({ query: `(max-width: 480px)` });

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
