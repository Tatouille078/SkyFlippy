import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useTranslation } from '../../contexts/TranslationContext';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function normalPdf(x : number, mean : number, stdDev : number) {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

const MargeChart = () => {

    const { translation } = useTranslation()

    const xValues = Array.from({ length: 50 }, (_, i) => i * (30 / 50));
    const yValues = xValues.map(x => normalPdf(x, 15, 5));

    const y_max = Math.max(...yValues);

    const data = {
        labels: xValues,
        datasets: [
            {
                label: `${translation.homePage.sidebar.graphs.margeGraph[1]}`,
                data: yValues.map(y => y * (25 / y_max)),
                borderColor: "pink",
                borderWidth: 2,
            },
        ],
    };

    const options : ChartOptions<"line"> = {
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
                    text: `${translation.homePage.sidebar.graphs.margeGraph[2]}`,
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
    return <Line data={data} options={options} />;
};

export default MargeChart