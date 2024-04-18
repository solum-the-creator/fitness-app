import { useMediaQuery } from 'react-responsive';
import { Pie, PieConfig } from '@ant-design/plots';
import { COLORS } from '@constants/styles';
import { convertDataForPieChart, PopularExercise } from '@utils/exercise';

type ExercisePieChartProps = {
    data: Array<{
        dayOfWeek: number;
        mostPopularExercise: PopularExercise | null;
    }>;
};

export const ExercisePieChart = ({ data }: ExercisePieChartProps) => {
    const matches = useMediaQuery({ query: '(max-width: 980px)' });

    const convertedData = convertDataForPieChart(data);

    const config: PieConfig = {
        data: convertedData,
        angleField: 'count',
        colorField: 'name',
        legend: false,
        innerRadius: 0.7,
        label: {
            text: 'name',
            position: 'outside',
            connector: false,
            style: {
                fontSize: 14,
                fill: COLORS.primaryTextColor,
                fillOpacity: 1,
            },
        },
        style: {
            stroke: COLORS.characterLightDividers,
        },
        tooltip: false,
        width: matches ? undefined : 520,
        height: matches ? 210 : 334,

        paddingTop: matches ? 24 : 89,
        paddingBottom: matches ? 24 : 89,
        paddingLeft: matches ? 86 : 182,
        paddingRight: matches ? 86 : 182,

        scale: {
            color: {
                palette: 'Sinebow',
            },
        },
    };

    return convertedData.length ? <Pie {...config} /> : null;
};
