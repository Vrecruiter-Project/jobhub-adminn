import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
    // Data for enrolled and unenrolled
    const enrolledData = 500; // Example: 500 enrolled
    const unenrolledData = 300; // Example: 300 unenrolled
    const unenrolledDatdummy = 259
    // Data for the Polar Area Chart
    const data = {
        labels: ['Male', 'Female','unenrolledDatdummy'],
        datasets: [
            {
                label: 'Students',
                data: [enrolledData, unenrolledData,unenrolledDatdummy],
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

    // Options for the Polar Area Chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true, // Start the scale at 0
            },
        },
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
            <PolarArea data={data} options={options} />
    );
};

export default PolarChart;