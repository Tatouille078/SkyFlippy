import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const offreDemande = (buyVolumeProduct) => {

    if (buyVolumeProduct <= 75) {
        return 25;
    } else if (buyVolumeProduct > 75 && buyVolumeProduct <= 600) {
        const slope = -25 / 525;
        return slope * (buyVolumeProduct - 75) + 25;
    }

    return 0;
};

const generateData = () => {
    const xValues = [];
    const yValues = [];

    for (let i = 0; i <= 660; i += 20) {
        const y = offreDemande(i);
        yValues.push(y);
        xValues.push(i);
    }

    return {
        labels: xValues,
        datasets: [
            {
                label: 'Score Supply/Demand',
                data: yValues,
                borderColor: 'pink',
                fill: true,
                borderWidth: 2,
            },
        ],
    };
};

const OffreDemandeChart = () => {
    const data = generateData();

    return (
        <div>
            <Line data={data} options={{
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
                            text: 'delta offre/demande',
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
            }} />
        </div>
    );
};

export default OffreDemandeChart