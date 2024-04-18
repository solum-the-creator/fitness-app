import { StarFilled, StarOutlined } from '@ant-design/icons';

export const CustomRateCharacter = ({ value, index }: { value?: number; index?: number }) =>
    value && index !== undefined && index < value ? <StarFilled /> : <StarOutlined />;
