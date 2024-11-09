import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function normalPdf(x, mean, stdDev) {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

const MargeChart = () => {

    const xValues = Array.from({ length: 50 }, (_, i) => i * (30 / 50));
    const yValues = xValues.map(x => normalPdf(x, 15, 5));

    const y_max = Math.max(...yValues);

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Score per margin percentage',
                data: yValues.map(y => y * (25 / y_max)),
                borderColor: 'rgb(207, 96, 255)',
                backgroundColor: 'rgba(207, 96, 255, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Margin Percentage',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Score',
                },
                suggestedMin: 0,
                suggestedMax: 25,
            },
        },
    };
    return <Line data={data} options={options} />;
};

export default MargeChart