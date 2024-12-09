import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);


const popularityHigh = (x: number) => {

    if (x <= 5) {
        return 0;
    } else if (x > 5 && x <= 25) {
        return (12.5 / 20) * (x - 5);
    } else if (x > 25 && x <= 80) {
        return (12.5 / 55) * (x - 25) + 12.5;
    }
    return 25;
}

const PopularityHighChart = () => {
    const yValues = [];
    const xValues = [];

    for (let x = 0; x <= 90; x += 2) {
        yValues.push(popularityHigh(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Score per popularity',
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
                    text: 'Supply/Demand when price is above 50000',
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
                suggestedMax: 30,
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
};


export default PopularityHighChart