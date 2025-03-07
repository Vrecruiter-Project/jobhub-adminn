import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    // Data for enrolled and unenrolled over a week
    const enrolledData = [120, 150, 130, 170, 200, 120, 180]; // Example: Enrolled data for each day of the week
    const unenrolledData = [100, 130, 110, 160, 190, 100, 150]; // Example: Unenrolled data for each day of the week

    // Data for the Line Chart
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
        datasets: [
            {
                label: 'Enrolled',
                data: enrolledData,
                borderColor: 'rgba(75, 192, 192, 1)', // Line color for Enrolled
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
                borderWidth: 2,
                fill: true, // Fill the area under the line
            },
            {
                label: 'Unenrolled',
                data: unenrolledData,
                borderColor: 'rgba(255, 99, 132, 1)', // Line color for Unenrolled
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fill color under the line
                borderWidth: 2,
                fill: true, // Fill the area under the line
            },
        ],
    };

    // Options for the Line Chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', // Position the legend at the top
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
            title: {
                display: true,
                text: 'Enrolled vs Unenrolled Candidates Over a Week', // Chart title
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days of the Week', // X-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Candidates', // Y-axis label
                },
                beginAtZero: true, // Start the Y-axis at 0
            },
        },
    };

    return (
        
        <Line data={data} options={options} />
    );
};

export default LineChart;