import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from '../../contexts/TranslationContext';

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
    const { translation } = useTranslation()

    for (let x = 0; x <= 1100; x += 25) {
        yValues.push(popularityMedium(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: `${translation.homePage.sidebar.graphs.popuGraph[1]}`,
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
                    text: `${translation.homePage.sidebar.graphs.popuGraph[2]} > 1 000 <= 10 000`,
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
                suggestedMax: 25,
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
};

export default PopularityMediumChart