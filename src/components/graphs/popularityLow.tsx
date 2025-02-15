import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useTranslation } from '../../contexts/TranslationContext';

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
    const { translation } = useTranslation()

    for (let x = 400; x <= 6200; x += 150) {
        yValues.push(popularityLow(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: `${translation.homePage.sidebar.graphs.popuGraph[1]}`,
                data: yValues,
                fill: false,
                borderColor: '#cdc333',
                borderWidth: 2,
            },
        ],
    };
    const options: ChartOptions<"line"> = {
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
                    text: `${translation.homePage.sidebar.graphs.popuGraph[2]} <= 1 000`,
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

export default PopularityLowChart