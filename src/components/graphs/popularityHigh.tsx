import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useTranslation } from '../../contexts/TranslationContext';

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
    const { translation } = useTranslation()

    for (let x = 0; x <= 90; x += 2) {
        yValues.push(popularityHigh(x))
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
                    text: `${translation.homePage.sidebar.graphs.popuGraph[2]} > 50 000`,
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
    };

    return (
        <Line data={data} options={options} />
    );
};


export default PopularityHighChart