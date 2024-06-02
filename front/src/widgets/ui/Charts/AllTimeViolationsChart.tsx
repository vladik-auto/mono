import { Line } from '@ant-design/plots';

const allTimeData = [
    { date: '2023-01-01', count: 5 },
    { date: '2023-02-01', count: 3 },
    { date: '2023-03-01', count: 4 },
    { date: '2023-04-01', count: 2 },
    { date: '2023-05-01', count: 3 },
    { date: '2023-06-01', count: 1 },
    { date: '2023-07-01', count: 2 },
    { date: '2023-08-01', count: 3 },
    { date: '2023-09-01', count: 1 },
    { date: '2023-10-01', count: 2 },
    { date: '2023-11-01', count: 2 },
    { date: '2023-12-01', count: 7 },
];


const config = {
    data: allTimeData,
    xField: 'date',
    yField: 'count',
    smooth: true,
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

export const AllTimeViolationsChart = () => <Line {...config} />;
