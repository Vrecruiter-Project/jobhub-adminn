import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    // Data for enrolled and unenrolled
    const enrolledData = 500; // Example: 500 enrolled
    const unenrolledData = 300; // Example: 300 unenrolled

    // Data for the Doughnut Chart
    const data = {
        labels: ['Enrolled', 'Unenrolled'],
        datasets: [
            {
                label: 'Students',
                data: [enrolledData, unenrolledData],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Light blue for Enrolled
                    'rgba(255, 99, 132, 0.6)', // Light red for Unenrolled
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Border color for Enrolled
                    'rgba(255, 99, 132, 1)', // Border color for Unenrolled
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the Doughnut Chart
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
        },
    };

    return (
        
            <Doughnut data={data} options={options} />
        
    );
};

export default DoughnutChart;