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
                borderColor: 'rgb(207, 96, 255)',
                backgroundColor: 'rgba(207, 96, 255, 0.2)',
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
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Summ of buy + sell amount',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Score',
                        },
                        min: 0,
                        max: 30,
                    },
                },
            }} />
        </div>
    );
};

export default OffreDemandeChart