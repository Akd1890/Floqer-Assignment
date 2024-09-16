import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface AnalyticsChartProps {
  data: { year: number; totalJobs: number; averageSalary: number }[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Average Salary',
        data: data.map(d => d.averageSalary),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Total Jobs',
        data: data.map(d => d.totalJobs),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Analytics Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default AnalyticsChart;
