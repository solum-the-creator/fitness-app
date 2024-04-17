import { useMediaQuery } from 'react-responsive';
import { Column, ColumnConfig } from '@ant-design/plots';
import { DATE_SHORT_FORMAT } from '@constants/constants';
import { ColumnData } from '@utils/trainings';
import moment from 'moment';

import styles from './column-per-month.module.scss';

type ColumnPerMonthProps = {
    data: ColumnData[];
};

export const ColumnPerMonth = ({ data }: ColumnPerMonthProps) => {
    const isFullScreen = useMediaQuery({ query: '(min-width: 1200px)' });
    const matches = useMediaQuery({ query: '(max-width: 560px)' });

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
                lineStroke: '#BFBFBF',
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
            fill: '#85A5FF',
            margin: 0,
        },
        sizeField: matches ? 18 : 30,
        interaction: {
            elementHighlightByColor: false,
        },
        insetLeft: 30,
        marginTop: 26,
        paddingLeft: 40,
        paddingRight: 24,
        height: matches ? 236 : 344,
        tooltip: false,
        scrollbar: {
            x: {
                ratio: isFullScreen ? 0.5 : 0.3,
            },
        },
        className: styles.chart,
    };

    return <Column {...config} />;
};
