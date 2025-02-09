import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from '../../contexts/TranslationContext';

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
    const { translation } = useTranslation()

    for (let i = 0; i <= 660; i += 20) {
        const y = offreDemande(i);
        yValues.push(y);
        xValues.push(i);
    }

    return {
        labels: xValues,
        datasets: [
            {
                label: `${translation.homePage.sidebar.graphs.supplyGraph[1]}`,
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
    const { translation } = useTranslation()

    return (
        <div>
            <Line data={data} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: 'gray',
                        },
                    },
                    tooltip: {
                        titleColor: 'gray',
                        bodyColor: 'gray',
                    },
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: `${translation.homePage.sidebar.graphs.supplyGraph[2]}`,
                            color: 'gray',
                        },
                        ticks: {
                            color: 'gray',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Score',
                            color: 'gray',
                        },
                        ticks: {
                            color: 'gray',
                        },
                        grid: {
                            color: 'black',
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