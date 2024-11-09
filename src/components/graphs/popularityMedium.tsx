import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const popularityMedium = (x: number) => {

    if (x <= 100) {
        return 0;
    } else if (x > 100 && x <= 400) {
        return (12.5 / 350) * (x - 100);
    } else if (x > 400 && x <= 1000) {
        return (12.5 / 550) * (x - 450) + 12.5;
    }
    return 25;
}

const PopularityMediumChart = () => {
    const yValues = [];
    const xValues = [];

    for (let x = 0; x <= 1100; x += 25) {
        yValues.push(popularityMedium(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Score per popularity',
                data: yValues,
                fill: false,
                borderColor: 'rgb(207, 96, 255)',
                backgroundColor: 'rgba(207, 96, 255, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Supply/Demand when price is > 1000 <= 1000',
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

    return (
        <Line data={data} options={options} />
    );
};

export default PopularityMediumChart