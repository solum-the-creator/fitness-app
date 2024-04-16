import { useMediaQuery } from 'react-responsive';
import { Pie, PieConfig } from '@ant-design/plots';

export const ExercisePieChart = () => {
    const matches = useMediaQuery({ query: '(max-width: 840px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 580px)' });

    const data = [
        {
            name: 'Подтягивания',
            value: 10,
        },
        {
            name: 'Приседания',
            value: 15,
        },
        {
            name: 'Отжимания',
            value: 20,
        },
        {
            name: 'Ходьба',
            value: 25,
        },
    ];

    const config: PieConfig = {
        data,
        angleField: 'value',
        colorField: 'name',
        legend: false,
        innerRadius: 0.7,
        label: {
            text: 'name',
            position: 'outside',
            connector: false,
            style: {
                fontSize: 14,
                fill: '#262626',
                fillOpacity: 1,
            },
        },
        style: {
            stroke: '#F0F0F0',
        },
        tooltip: false,
        width: matches ? undefined : 520,
        height: isMobile ? 210 : 334,

        paddingTop: isMobile ? 24 : 89,
        paddingBottom: isMobile ? 24 : 89,
        paddingLeft: isMobile ? 86 : 182,
        paddingRight: isMobile ? 86 : 182,

        scale: {
            color: {
                palette: 'Sinebow',
            },
        },
    };

    return <Pie {...config} />;
};
