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
                borderColor: 'rgb(207, 96, 255)',
                backgroundColor: 'rgba(207, 96, 255, 0.2)',
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
                    text: 'Supply/Demand when price is above 5000',
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


export default PopularityHighChart