import { Column } from '@ant-design/plots';

const lastWeekData = [
    { date: '2023-06-01', count: 3 },
    { date: '2023-06-02', count: 5 },
    { date: '2023-06-03', count: 4 },
    { date: '2023-06-04', count: 7 },
    { date: '2023-06-05', count: 2 },
    { date: '2023-06-06', count: 6 },
    { date: '2023-06-07', count: 8 },
];


const config = {
    data: lastWeekData,
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

export const LastWeekViolationsChart = () => <Column {...config} />;
