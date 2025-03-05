import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Grap from './lineCharts';

// Register necessary Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    // Updated data for the bar chart: weeks and male/female data
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Male',
                data: [120, 150, 130, 170, 200],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Female',
                data: [100, 130, 110, 160, 190],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options with zoom and pan functionality enabled by the chartjs-plugin-zoom addon
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to take the full available height and width
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    enabled: true,
                    mode: 'xy',
                },
            },
        },
    };

    return (

        <Bar data={data} options={options} />

    );
};

export default BarChart;