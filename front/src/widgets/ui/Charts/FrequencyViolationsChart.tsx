import { Histogram } from '@ant-design/charts';
import { Bar } from '@ant-design/plots';

const frequencyViolationsData = [
    { date: '2023-01-01', count: 1 },
    { date: '2023-01-02', count: 21 },
    { date: '2023-01-03', count: 13 },
    { date: '2023-01-04', count: 31 },
    { date: '2023-01-05', count: 42 },
    { date: '2023-01-06', count: 12 },
    { date: '2023-01-07', count: 17 },
    { date: '2023-01-08', count: 48 },
    { date: '2023-01-09', count: 22 },
    { date: '2023-01-10', count: 21 },
    { date: '2023-01-11', count: 21 },
    { date: '2023-01-12', count: 12 },
];

const config = {
    data: frequencyViolationsData,
    xField: 'date',
    yField: 'count',
    xAxis: {
        title: {
            text: 'Дата',
        },
    },
    yAxis: {
        title: {
            text: 'Количество нарушений',
        },
    },
};

export const FrequencyViolationsChart = () => <Bar {...config} />;
