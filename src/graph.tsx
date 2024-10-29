import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// PDF function to calculate the height of the normal distribution at a given x
function normalPdf(x, mean, stdDev) {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

const MargeChart = () => {
    // Calculate margePercent from buy and sell prices
    const mean = 15;
    const stdDev = 5;

    // Generate data points for the chart
    const xValues = Array.from({ length: 50 }, (_, i) => i * (30 / 50));
    const yValues = xValues.map(x => normalPdf(x, mean, stdDev));

    // Find max y-value for scaling purposes
    const y_max = Math.max(...yValues);

    // Chart data
    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Height of PDF at Margin Percentage',
                data: yValues.map(y => y * (25 / y_max)),  // Scale y-values to a max of 25
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Muhaha`,
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Margin Percentage',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Height of PDF',
                },
                suggestedMin: 0,
                suggestedMax: 25,
            },
        },
    };

    return <Line data={data} options={options} />;
};

const prix = (buyPriceProduct) => {
    const rise = 1 / (1 + Math.exp(-0.015 * (buyPriceProduct - 450)));
    const fall = 1 / (1 + Math.exp(0.0001 * (buyPriceProduct - 50000)));
  
    const prixScore = (25.25 * (rise * fall) / Math.max(rise, fall));
    return prixScore >= 25 ? 25 : prixScore;
  };
  
const PriceScoreChart = () => {
    // Generate data points
    const dataPoints = Array.from({ length: 500 }, (_, index) => index * 100); // Generate x values from 0 to 49500 in increments of 500
    const prixScores = dataPoints.map(prix); // Calculate y values using the prix function
  
    // Prepare data for the chart
    const data = {
      labels: dataPoints,
      datasets: [
        {
          label: 'Prix Score',
          data: prixScores,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,0.9)',
        },
      ],
    };
  
    // Chart options
    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Muhaha`,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Prix Score',
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

    for (let i = 0; i <= 660; i += 20) { // Adjust the step for finer or coarser resolution
        const y = offreDemande(i);
        yValues.push(y);
        xValues.push(i);
    }

    return {
        labels: xValues,
        datasets: [
            {
                label: 'Offre-Demande Relationship',
                data: yValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
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
                    title: {
                        display: true,
                        text: `Muhaha`,
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Y (Output Value)',
                        },
                        min: 0,
                        max: 30,
                    },
                },
            }} />
        </div>
    );
};

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

    for (let x = 400; x <= 6200; x += 150) {
        yValues.push(popularityLow(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'popularity Low Chart',
                data: yValues,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,0.9)',
            },
        ],
    };
    
      // Chart options
    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Muhaha`,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Popu Score',
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

    for (let x = 0; x <= 1100; x += 25) {
        yValues.push(popularityMedium(x))
        xValues.push(x)
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'popularity Medium Chart',
                data: yValues,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,0.9)',
            },
        ],
    };
    
      // Chart options
    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Muhaha`,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Popu Score',
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
                label: 'popularity High Chart',
                data: yValues,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,0.9)',
            },
        ],
    };
    
      // Chart options
    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Muhaha`,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Popu Score',
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


export {
    MargeChart,
    PriceScoreChart,
    OffreDemandeChart,
    PopularityLowChart,
    PopularityMediumChart,
    PopularityHighChart
};