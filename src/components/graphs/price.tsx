import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const prix = (buyPriceProduct) => {
    const rise = 1 / (1 + Math.exp(-0.015 * (buyPriceProduct - 450)));
    const fall = 1 / (1 + Math.exp(0.0001 * (buyPriceProduct - 50000)));

    const prixScore = (25.25 * (rise * fall) / Math.max(rise, fall));
    return prixScore >= 25 ? 25 : prixScore;
};

const PriceChart = () => {
    const dataPoints = Array.from({ length: 60 }, (_, index) => index < 16 ? index * 50 : (index - 15) * 1300);
    const prixScores = dataPoints.map(prix);

    const data = {
        labels: dataPoints,
        datasets: [
            {
                label: 'Score per price',
                data: prixScores,
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
                    text: 'Price',
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

export default PriceChart