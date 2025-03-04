import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Data for Line Chart
const lineData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    },
  ],
};

// Options for both Line and Bar charts
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

// Data for Bar Chart
const barData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Revenue',
      data: [45, 50, 65, 70, 45, 60],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const SimpleChart = () => {
  return (
    <div style={{ width: '100%', height: '50%', marginBottom: '30px' }}>
      {/* Line Chart */}
      {/* <Line data={lineData} options={options} /> */}

      {/* Bar Chart */}
      <div style={{ marginTop: '50px' }}>
        {/* <Bar data={barData} options={options} /> */}
      </div>
    </div>
  );
};

export default SimpleChart;
