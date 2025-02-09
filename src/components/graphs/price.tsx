import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useTranslation } from '../../contexts/TranslationContext';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const prix = (buyPriceProduct: number) => {
    const rise = 1 / (1 + Math.exp(-0.015 * (buyPriceProduct - 450)));
    const fall = 1 / (1 + Math.exp(0.0001 * (buyPriceProduct - 50000)));

    const prixScore = (25.25 * (rise * fall) / Math.max(rise, fall));
    return prixScore >= 25 ? 25 : prixScore;
};

const PriceChart = () => {
    const dataPoints = Array.from({ length: 60 }, (_, index) => index < 16 ? index * 50 : (index - 15) * 1300);
    const prixScores = dataPoints.map(prix);
    const { translation } = useTranslation()

    const data = {
        labels: dataPoints,
        datasets: [
            {
                label: `${translation.homePage.sidebar.graphs.priceGraph[1]}`,
                data: prixScores,
                fill: false,
                borderColor: 'pink',
                borderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        plugins: {
            legend: {
                position: 'top',
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
                title: {
                    display: true,
                    text: `${translation.homePage.sidebar.graphs.priceGraph[2]}`,
                    color: 'gray'
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
                    color: 'gray'
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

export default PriceChart