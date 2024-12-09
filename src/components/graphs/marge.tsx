import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { StateContextType, useStateContext } from '../../context';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function normalPdf(x, mean, stdDev) {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

const MargeChart = () => {

    const { currentTheme }: StateContextType = useStateContext();
    console.log(currentTheme);


    const xValues = Array.from({ length: 50 }, (_, i) => i * (30 / 50));
    const yValues = xValues.map(x => normalPdf(x, 15, 5));

    const y_max = Math.max(...yValues);

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Score per margin percentage',
                data: yValues.map(y => y * (25 / y_max)),
                borderColor: "pink",
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
                    text: 'Margin Percentage',
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
    return <Line data={data} options={options} />;
};

export default MargeChart