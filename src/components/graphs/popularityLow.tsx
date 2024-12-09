import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const popularityLow = (x: number) => {

    if (x <= 500) {
        return 0;
    } else if (x > 500 && x <= 1500) {
        return (12.5 / 1000) * (x - 500);
    } else if (x > 1500 && x <= 6000) {
        return (12.5 / 4500) * (x - 1500) + 12.5;
    }
    return 25;
}

const PopularityLowChart = () => {
    const yValues = [];
    const xValues = [];

    for (let x = 400; x <= 6200; x += 150) {
        yValues.push(popularityLow(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Score per Popularity',
                data: yValues,
                fill: false,
                borderColor: 'pink',
                borderWidth: 2,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: 'gray', // Texte de la légende en noir
                },
            },
            tooltip: {
                titleColor: 'gray', // Titre des tooltips en noir
                bodyColor: 'gray', // Corps des tooltips en noir
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Supply/demand when price is <= 1000',
                    color: 'gray', // Titre de l'axe X en noir
                },
                ticks: {
                    color: 'gray', // Ticks de l'axe X en noir
                },
                grid: {
                    color: 'black', // Grille de l'axe X en noir
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Score',
                    color: 'gray', // Titre de l'axe Y en noir
                },
                ticks: {
                    color: 'gray', // Ticks de l'axe Y en noir
                },
                grid: {
                    color: 'black', // Grille de l'axe Y en noir
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

export default PopularityLowChart