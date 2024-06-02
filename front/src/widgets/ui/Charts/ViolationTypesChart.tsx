import { Pie } from '@ant-design/charts';

const violationTypesData = [
    { type: 'Безопасность', count: 25 },
    { type: 'Этика', count: 15 },
    { type: 'Трудовая дисциплина', count: 20 },
    { type: 'Прочие', count: 10 },
];


const config = {
    data: violationTypesData,
    angleField: 'count',
    colorField: 'type',
    radius: 1,
    legend: {
        color: {
            title: false,
            position: 'right',
            rowPadding: 10,
        },
        itemName: {
            style: {
                fill: '#ff0000', // Замените на нужный вам цвет
            },
        },
    },
    label: {
        type: 'outer',
        content: '{name} {percentage}',
    },
};

export const ViolationTypesChart = () => <Pie {...config} />;
