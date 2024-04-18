import { useMediaQuery } from 'react-responsive';
import { Column, ColumnConfig } from '@ant-design/plots';
import { DATE_SHORT_FORMAT } from '@constants/constants';
import { COLORS } from '@constants/styles';
import { ColumnData } from '@utils/trainings';
import moment from 'moment';

import styles from './column-per-week.module.scss';

type ColumnPerWeekProps = {
    data: ColumnData[];
};

export const ColumnPerWeek = ({ data }: ColumnPerWeekProps) => {
    const matches = useMediaQuery({ query: '(max-width: 460px)' });

    const config: ColumnConfig = {
        data,
        xField: 'date',
        yField: 'value',
        axis: {
            x: {
                labelFormatter: (value: string) => moment(value).format(DATE_SHORT_FORMAT),
                title: 'Нагрузка, кг',
                titleSpacing: matches ? 8 : 16,
                titlePosition: 'bottom',
                titleFontSize: matches ? 10 : 14,
                tick: false,
                labelSpacing: matches ? 8 : 20,

                line: true,
                lineLineWidth: 1,
                lineStroke: COLORS.characterLightDisable,
                lineExtension: [-20, -10],
                lineLineDash: [2, 4],
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                fontSize: 1,
                labelSpacing: matches ? 8 : 16,
                labelTextAlign: 'start',
            },
        },
        style: {
            fill: COLORS.primaryLight4,
            margin: 0,
        },
        sizeField: matches ? 15 : 30,
        interaction: {
            elementHighlightByColor: false,
        },
        insetLeft: 10,
        paddingLeft: 40,
        marginTop: 26,
        width: matches ? 328 : 520,
        height: matches ? 236 : 374,
        tooltip: false,
        className: styles.chart,
    };

    return <Column {...config} />;
};
