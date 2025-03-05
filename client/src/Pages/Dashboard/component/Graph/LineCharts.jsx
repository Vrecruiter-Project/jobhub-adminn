import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)
const Linechart = () => {
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Enrolled',
                data: [120, 150, 130, 170, 200],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Unenrolled ',
                data: [100, 130, 110, 160, 190],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: true,
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    }


    
    return (
        <>
            <Line
                data={data}
                options={options}
            />
        </>
    )
}
export default Linechart;