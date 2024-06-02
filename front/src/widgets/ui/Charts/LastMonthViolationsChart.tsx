import { Column } from '@ant-design/plots';

const lastMonthData = [
    { date: '2023-05-01', count: 5 },
    { date: '2023-05-02', count: 8 },
    { date: '2023-05-03', count: 7 },
    { date: '2023-05-04', count: 10 },
    { date: '2023-05-05', count: 6 },
    { date: '2023-05-06', count: 9 },
    { date: '2023-05-07', count: 4 },
    { date: '2023-05-08', count: 11 },
    { date: '2023-05-09', count: 3 },
    { date: '2023-05-10', count: 12 },
    { date: '2023-05-11', count: 5 },
    { date: '2023-05-12', count: 7 },
    { date: '2023-05-13', count: 6 },
    { date: '2023-05-14', count: 8 },
    { date: '2023-05-15', count: 10 },
    { date: '2023-05-16', count: 9 },
    { date: '2023-05-17', count: 11 },
    { date: '2023-05-18', count: 4 },
    { date: '2023-05-19', count: 3 },
    { date: '2023-05-20', count: 6 },
    { date: '2023-05-21', count: 5 },
    { date: '2023-05-22', count: 7 },
    { date: '2023-05-23', count: 8 },
    { date: '2023-05-24', count: 9 },
    { date: '2023-05-25', count: 4 },
    { date: '2023-05-26', count: 10 },
    { date: '2023-05-27', count: 11 },
    { date: '2023-05-28', count: 3 },
    { date: '2023-05-29', count: 7 },
    { date: '2023-05-30', count: 6 },
    { date: '2023-05-31', count: 12 },
];

const config = {
    data: lastMonthData,
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

export const LastMonthViolationsChart = () => <Column {...config} />;
