import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateParabolaData = (min, max, step) => {
    const labels = [];
    const data = [];

    for (let x = min; x <= max; x += step) {
        labels.push(x.toFixed(2)); // Étiquettes pour les valeurs de x
        data.push(Math.pow(x, 2)); // y = x^2
    }

    return { labels, data };
};

const ParabolaChart = () => {
    // Génération des données pour la parabole
    const { labels, data } = generateParabolaData(-10, 10, 0.5);

    // Config pour Chart.js
    const chartData = {
        labels,
        datasets: [
            {
                label: 'y = x²',
                data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Graphique de la Parabole y = x²',
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ParabolaChart;